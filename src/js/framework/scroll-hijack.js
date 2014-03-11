$(document).ready(function() {

  var page_height = $('.fp-content-parent.on').height();
  var vp_height = $(window).height();

  if (page_height <= vp_height) {
    console.log('Scroll hijack');
  }

  console.log('page: ' + page_height);
  console.log('vp: ' + vp_height);

});