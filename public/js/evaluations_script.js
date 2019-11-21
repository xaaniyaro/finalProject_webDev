urlBase = "/evaluaciones";
tableList = [];
type = "";
group = "";
/*function loadPosts() {
  $("#table > tr").remove();
  $.ajax({
    url: urlBase,
    method: "GET",
    datatype: "json",
    success: function(response){
      tableList = [];
      response.map(post => tableList.push(post));
    },
    error: function(error){
      console.log(error);
    }
  }).done(function() {
    tableList.forEach(post =>{
      let nombre = $(`<td>${post.nombre}</td>`);
      let grupo = $(`<td>${post.grupo}</td>`);
      let grade = $(`<td>${post.grade}</td>`);
      let button = $(`<td><button type="button" class="btn btn-danger" data-id="${post.id}">Borrar</button></td>`);
      let reg = $(`<tr>`).append(nombre,grupo,grade,button);
      $("#table").append(reg);
    })
  });
}*/

function loadPostsByGroup(){
    $("#table > tr").remove();
    if(!type){
        alert("No hay nada que buscar");
        return;
    }
    let obj ={
        type: type
    };
    $.ajax({
      url: urlBase + "/grupo",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: function(response){
        tableList = [];
        response.map(post => tableList.push(post));
      },
      error: function(error){
        console.log(error);
      }
    }).done(function() {
      if(admin){
        tableList.forEach(post =>{
          let nombre = $(`<td>${post.nombre}</td>`);
          let grupo = $(`<td>${post.grupo}</td>`);
          let grade = $(`<td>${post.grade}</td>`);
          let button = $(`<td><button type="button" class="btn btn-danger" data-id="${post.id}">Borrar</button></td>`);
          let reg = $(`<tr>`).append(nombre,grupo,grade,button);
          $("#table").append(reg);
        })
      }
      else{
        tableList.forEach(post =>{
          let nombre = $(`<td>${post.nombre}</td>`);
          let grupo = $(`<td>${post.grupo}</td>`);
          let grade = $(`<td>${post.grade}</td>`);
          let reg = $(`<tr>`).append(nombre,grupo,grade);
          $("#table").append(reg);
        })
      }
    });
}

$("#newPostButton").click(function(){
    let nombre = $("#inputNombre").val();
    let grupo = group;
    let grade = $("#inputPromedio").val();
    let obj = {
        nombre : nombre,
        grupo : grupo,
        grade: grade
    };
    console.log(obj.grupo);

    $.ajax({
        url: urlBase,
        data: JSON.stringify(obj),
        method: "POST",
        contentType: "application/json",
        success: function(){
        loadPostsByGroup();
        cleanInputs();
        },
        error: function(err){
        alert(err.statusText);
        }
    });
});

$("#table").on('click', ".btn-danger", function(event){
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
        loadPostsByGroup();
      },
      error: function(err){
        alert(err.statusText);
      }
    });
});

$("#dropMenu").on('click', ".dropdown-item", function(event){
    event.preventDefault();
    type = $(this).data("type");
    $("#dropdownMenu").html(type);
    loadPostsByGroup();
});

$("#dropInput").on('click', ".dropdown-item", function(event){
  event.preventDefault();
  group =$(this).data("type");
  $("#dropdownTitle").html(group);
});

function cleanInputs(){
  $("input[type=text]").val("");
}

$("#table > tr").remove();