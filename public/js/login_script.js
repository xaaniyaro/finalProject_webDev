
$("#registrarButton").click(function(){
  let email = $("#inputEmail").val();
  let pass = $("#inputPass").val();
  let passC = $("#inputPassC").val();

  if(pass != passC){
    $("#alertPass").show();
    return;
  }

  let obj = {
      email : email,
      pass : pass,
  };

  $.ajax({
      url: urlBase,
      data: JSON.stringify(obj),
      method: "POST",
      contentType: "application/json",
      success: function(){
      
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



