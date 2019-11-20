urlBase = "/evaluaciones";
tableList = [];

function loadPosts() {
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
}

$("#newPostButton").click(function(){
    let nombre = $("#inputNombre").val();
    let grupo = $("#inputGrupo").val();
    let grade = $("#inputGrade").val();
    let obj = {
        nombre : nombre,
        grupo : grupo,
        grade: grade
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

$("#table").on('click', ".btn .btn-danger", function(event){
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

$("#todoButton").click(function(){
    $("#todoButton").hide();
    loadPosts();
});

$(".dropdown").on('click', ".dropdown-item", function(event){
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
    $("#table > tr").remove();
    $.ajax({
      url: urlBase + "?grupo=value",
      method: "GET",
      datatype: "json",
      data: JSON.stringify(obj),
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
});

function cleanInputs(){
$("input[type=text]").val("");
}

loadPosts();