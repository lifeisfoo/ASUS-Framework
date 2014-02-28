$(document).ready(function() {

	// Hide all except for the first parent for each container
  $('.tc-container').find('>.tc-content-parent:not(:first)').addClass('off');
  $('.tc-container').find('>.tc-content-parent:first').addClass('on');
  // First nav should also be active per container
  $('.tc-container').find('.tc-nav:first').addClass('active');

});