$(document).ready(function() {

	// Hide all except for the first parent for each container
  $('.tc-container').find('>.tc-content-parent:not(:first)').addClass('off');
  $('.tc-container').find('>.tc-content-parent:first').addClass('on');
  // First nav should also be active per container
  $('.tc-container').find('.tc-nav:first').addClass('active');

  $('.tc-nav').click(function(e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).parent().siblings().children('.active').removeClass('active');
      switchContent($(this).attr('href'));
    }
  });

  function switchContent(id) {
    $(id).parent().children('.tc-content-parent.on').toggleClass('off').toggleClass('on');
    $(id).toggleClass('off').toggleClass('on');
  }

});