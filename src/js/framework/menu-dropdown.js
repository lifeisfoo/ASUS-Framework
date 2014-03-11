$(document).ready(function() {

  $('.dropdown-menu-button').click(function(e) {
    e.preventDefault();
    toggleMenu();
  });

  $('.dropdown-item > a').click(function() {
    toggleMenu();
  })

  function toggleMenu() {
    $('.dropdown-menu').slideToggle('400','easeOutCirc');
  }

});