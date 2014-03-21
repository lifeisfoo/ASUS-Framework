$(document).ready(function() {

  var overlay = $('<div class="modal-overlay"></div>');
  var modal_box = $('<div class="modal-box"></div>');

  $('.modal').on('click touchstart', function(e) {

    e.preventDefault();
    
    var url = this.href;

    if (window_width() > 700) {

      add_overlay();
      stop_overflow();

      if ((url.indexOf('youtube.com') > -1) || (url.indexOf('youtu.be') > -1)) {
        add_youtube(get_youtube_id(url));
      }

    } else {
      document.location = url;
    }

  });

  function window_width() {
    return $(window).width();
  }

  function document_height() {
    return $(document).height();
  }

  function add_overlay() {
    $(overlay).appendTo('body').fadeIn('slow', function() {
      add_modal_box();
    });

    $('.modal-overlay').on('click touchstart', function() {
      close_modal();
    });
  }

  function close_modal() {
    reset_default();
    $(overlay).fadeOut().detach();
    $(modal_box).empty();
  }

  function add_modal_box() {
    $(modal_box).appendTo(overlay);
  }

  function add_youtube(id) {
    var video_container = $('<div class="video-container"><iframe src="http://www.youtube.com/embed/'+ id +'?autoplay=1" frameborder="0" width="560" height="315"></iframe></div>');

    $(video_container).appendTo(modal_box);
  }

  function get_youtube_id(url) {
    var id = url.split('v=')[1];
    var amp = id.indexOf('&');
    return (amp != -1) ? id.substring(0, amp) : id;
  }

  function stop_overflow() {
    $('body').addClass('cancel-overflow');
  }

  function reset_default() {
    $('body').removeClass('cancel-overflow');
  }

});

