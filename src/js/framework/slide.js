$(document).ready(function() {

  if ($('.slide').length) {

    $('.slide').on('click', function() {

      var offset = $(this).data('offset') || 0;
      var href_offset = $($(this).attr('href')).offset().top || 0;
      var total_offset = href_offset - offset;

      $('html, body').animate({
        scrollTop: total_offset + 'px'
      }, {
        duration: 500,
        easing: 'easeOutCirc'
      });
      return false;
    });

  }

});