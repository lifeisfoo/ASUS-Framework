$(document).ready(function() {

  $('.dropdown-menu-button').click(function(e) {
    e.preventDefault();
    $('.dropdown-menu').slideToggle('400','easeOutCirc');
  });

});