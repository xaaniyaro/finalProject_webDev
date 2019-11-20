urlBase = "";
cardList = [];

function loadPosts() {
  //$(".dashboard > .card").remove();
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
      let title = $(`<h5 class="card-title">${post.title}</h5>`);
      let name = $(`<p class="card-text teacherName">${post.name}</p>`);
      let description = $(`<p class="card-text">${post.description}</p>`);
      let deleteButton =$(`<div class="buttonContainer">
      <button type="button" class="btn btn-danger" data-id="${post.id}">Borrar</button>
    </div>`);
      let badge = $(`<span class="badge badge-info">${post.tipo}</span>`);
      let cardBody = $(`<div class="card-body">`).append(deleteButton,title,name,description,badge);
      let card = $(`<div class="card">`).append(cardBody);
      $("#list").append(card);
    })
  });
}

$("#newPostButton").click(function(){
    let title = $("#inputTitulo").val();
    let description = $("#inputDescripcion").val();
    //let name = variable global para sacar el nombre del usuario
    let tipo = $("#inputTipo").val();
    let obj = {
        title : title,
        //name: name,
        description : description,
        tipo: tipo
    };

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
    });
});

$("#todoButton").click(function(){
    $("#todoButton").hide();
    loadPosts();
});

  $("#list").on('click', ".dropdown-item", function(event){
    event.preventDefault();
    let type = $(this).data("type");
    if(!type){
        alert("No hay nada que buscar");
        return;
    }
    $("#todoButton").show();
    let obj ={
        type: type
    };
    $(".dashboard > .card").remove();
    $.ajax({
        url: urlBase,
        method: "GET",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function(response){
          cardList = [];
          response.map(post => cardList.push(post));
        },
        error: function(error){
          console.log(error);
        }
      }).done(function() {
        cardList.forEach(post =>{
            let title = $(`<h5 class="card-title">${post.title}</h5>`);
            let description = $(`<p class="card-text">${post.description}</p>`);
            let deleteButton =$(`<div class="buttonContainer">
            <button type="button" class="btn btn-danger" data-id="${post.id}">Borrar</button>
          </div>`);
            let badge = $(`<span class="badge badge-info">${post.tipo}</span>`);
            let cardBody = $(`<div class="card-body">`).append(deleteButton,title,description,badge);
            let card = $(`<div class="card">`).append(cardBody);
            $("#list").append(card);
        })
      });
});


$("#list").on('click', ".btn .btn-danger", function(event){
    event.preventDefault();
    let id = $(this).data("id");
    console.log(id);
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
  
function cleanInputs(){
    $("textarea").val("");
    $("input[type=text]").val("");
    $('input[type=date]').val("");
  
  }