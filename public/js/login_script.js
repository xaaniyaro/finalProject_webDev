let urlBase = "/usuario"

$("#registrarButton").click(function(){
  let name = $("#inputNombre").val();
  let email = $("#inputEmail").val();
  let pass = $("#inputPass").val();
  let passC = $("#inputPassC").val();

  if(!email){
    alert("No hay email");
    return;
  }

  if(!name){
    alert("No hay nombre");
    return;
  }

  if(!pass || !passC){
    alert("No hay contraseña");
    return;
  }

  if(pass != passC){
    $("#alertPass").show();
    return;
  }

  let obj = {
      name: name,
      email : email,
      pass : pass,
  };

  $.ajax({
      url: urlBase,
      data: JSON.stringify(obj),
      method: "POST",
      contentType: "application/json",
      success: function(){
          $(location).attr('href', './events.html');
          cleanInputs();
      },
      error: function(err){
      alert(err.statusText);
      }
  });
});

function checkPassword(str){
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

$("#iniciarButton").click(function(){

  let email = $("#inputEmailI").val();
  let pass = $("#inputPassI").val();

  if(!email && !pass){
    alert("No hay información de inicio de sesión");
    return;
  }

  if($("#inputEmailI").is(':invalid')){ 
    alert("El correo no es correcto");
    return;
  }

  if(!email){
    alert("Falta correo");
    return;
  }

  if(!pass){
    alert("Falta contraseña");
    return;
  }

  let obj = {
      email : email,
      pass : pass,
  };

  $.ajax({
      url: urlBase + "/login",
      data: JSON.stringify(obj),
      method: "POST",
      contentType: "application/json",
      success: function(){
        $(location).attr('href', './events.html');
        cleanInputs();
      },
      error: function(err){
      alert(err.statusText);
      }
  });
});

$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });

});

function cleanInputs(){
  $("input[type=text").val("");
  $("input[type=email]").val("");
  $("input[type=password]").val("");
}

cleanInputs();

