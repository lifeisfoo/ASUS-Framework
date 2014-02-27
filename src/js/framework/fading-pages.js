$(document).ready(function() {

  var top_z_index = 99;

  // Hide all except for the first parent
  $('.fp-content-parent:not(:first)').addClass('off');
  $('.fp-content-parent:first').addClass('on');
  // First nav should also be active
  $('.fp-nav:first').addClass('active');

  $('.fp-nav').click(function() {
    if (!$(this).hasClass('active')) {
      $('.fp-nav.active').removeClass('active');
      $(this).addClass('active');
      fadingPages($(this).attr('href'));
    }    
  });

  function fadingPages(id) {    
    
    console.log(id + ' is the ID');
    $('.fp-content-parent.on')
      .removeClass('on')
      .addClass('off');
    $(id).removeClass('off').addClass('on');

  }

});