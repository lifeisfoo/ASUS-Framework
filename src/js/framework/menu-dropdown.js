$(document).ready(function() {

  if ($('.dropdown-menu-button').length) {

    var $menu_button = $('.dropdown-menu-button');

    function toggleMenu() {
      $('.dropdown-menu').slideToggle('400','easeOutCirc');
    }

    $menu_button.on('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    $(document).on('click', function(e) {
      $.each( $menu_button, function() {
   
        var $el = $(this);

        if (this !== e.target && !$el.has(e.target).length && !$(e.target).is('.dropdown-menu-button') && $('.dropdown-menu').is(':visible')) { 
          toggleMenu();
        }

      });
    });

  }

});