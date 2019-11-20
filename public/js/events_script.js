urlBase = "/eventos";
cardList = [];

function loadPosts() {
  $(".dashboard > .card").remove();
  $.ajax({
    url: urlBase,
    method: "GET",
    datatype: "json",
    success: function(response){
      cardList = [];
      response.map(post => cardList.push(post));
    },
    error: function(error){
      console.log(error);
    }
  }).done(function() {
    cardList.forEach(post =>{
      let title = $(`<h4 class="card-title"> ${post.title}</h4><hr>`);
      let description = $(`<p class="card-text"> ${post.description}</p>`);
      let date = $(`<li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>${post.date}</li>`);
      let img = $(`<img class="card-img-top" src="${post.img}" alt="Card image cap"></img>`);
      let cardFooterButtons = 
      $(`<li class="list-inline-item pr-2">
      <button type="button" class="buttonEdit" id="editPostButton" data-id="${post.id}" data-toggle="modal" data-target="#editModal"><i class="material-icons">edit</i></button>
      </li>
      <li class="list-inline-item pr-2">
      <button type="button" class="buttonClose" data-id="${post.id}"><i class="material-icons">delete</i></button>
      </li>  `);
      let cardImg = $(`<div class="view overlay">`).append(img);
      let cardBody = $(`<div class="card-body">`).append(title,description);
      let cardFooter = $(`<div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
      <ul class="list-unstyled list-inline font-small">`).append(date,cardFooterButtons);
      let card = $(`<div class="card" style="width: 22rem;">`).append(cardImg,cardBody,cardFooter);
      $("#list").append(card);
    })
  });
}

$("#newPostButton").click(function(){
  let title = $("#inputTitulo").val();
  let description = $("#inputDescripcion").val();
  let img = $("#inputImg").val();
  let dateRaw = new Date($('#dateInput').val());
  let day = dateRaw.getDate() + 1;
  let month = dateRaw.getMonth() + 1;
  let year = dateRaw.getFullYear();
  let date = day + '/' + month + '/' + year;
  let obj = {
    title : title,
    description : description,
    img : img,
    eventDate : date
  };
  
  let title = $(`<h4 class="card-title"> ${title}</h4><hr>`);
  let description = $(`<p class="card-text"> ${description}</p>`);
  let date = $(`<li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>${date}</li>`);
  let img = $(`<img class="card-img-top" src="${img}" alt="Card image cap"></img>`);
  let cardFooterButtons = 
  $(`<li class="list-inline-item pr-2">
  <button type="button" class="buttonEdit" id="editPostButton" data-id="123" data-toggle="modal" data-target="#editModal"><i class="material-icons">edit</i></button>
  </li>
  <li class="list-inline-item pr-2">
  </li>  `);
  let cardImg = $(`<div class="view overlay">`).append(img);
  let cardBody = $(`<div class="card-body">`).append(title,description);
  let cardFooter = $(`<div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
  <ul class="list-unstyled list-inline font-small">`).append(date,cardFooterButtons);
  let card = $(`<div class="card" style="width: 22rem;">`).append(cardImg,cardBody,cardFooter);
  $("#list").append(card);

  /*
  $.ajax({
    url: urlBase,
    data: JSON.stringify(obj),
    method: "POST",
    contentType: "application/json",
    success: function(){
      loadPosts();
      cleanInputs();
    },
    error: function(err){
      alert(err.statusText);
    }
  });*/
});

$("#list").on('click', ".buttonClose", function(event){
  event.preventDefault();
  let id = $(this).data("id");
  if(!id){
    alert("No id provided");
    return;
  }

  let body = {
    id : id
  }

  $.ajax({
    url: urlBase + '/' + id,
    method: "DELETE",
    data: JSON.stringify(body),
    contentType: "application/json",
    success: function() {
      loadPosts();
    },
    error: function(err){
      alert(err.statusText);
    }
  });
});

$("#list").on('click', ".buttonEdit", function(event){
  event.preventDefault();
  let idU = $(this).data("id");
  console.log(idU);
  if(!idU){
    alert("No id provided");
    return;
  }

  let title = $("#inputTituloE").val();
  let description = $("#inputDescripcionE").val();
  let img = $("#inputImgE").val();
  let dateRaw = new Date($('#dateInputE').val());
  let day = dateRaw.getDate() + 1;
  let month = dateRaw.getMonth() + 1;
  let year = dateRaw.getFullYear();
  let date = day + '/' + month + '/' + year;
  let body = $.extend({}, {
      id: idU,
      title: title != "" ? title : undefined,
      description: description != "" ? description : undefined,
      img: img != "" ? img : undefined,
      date: date
  });

  $.ajax({
      url: urlBase + '/' + idU,
      method: "PUT",
      data: JSON.stringify(body),
      contentType: "application/json",
      success: function() {
          loadPosts();
          cleanInputs();
          alert("Succesful update");
      },
      error: function(err) {
          alert(err.statusText);
      }
  });
});

function cleanInputs(){
  $("textarea").val("");
  $("input[type=text]").val("");
  $('input[type=date]').val("");

}

loadPosts();