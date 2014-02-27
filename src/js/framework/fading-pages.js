$(document).ready(function() {

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

  var top_z_index = 99; // optionally used to align content
  var hash_init = window.location.hash; // check if there's a hash on page load

  if (hash_init.length > 0) { hashChange(hash_init); }
  
  function hashChange(url_hash) {
    var hash_array = $('.fp-nav').map(function() { // build an array of all the .fp-nav links to check
      return $(this).attr('href');
    }).toArray();
    if (isInArray(hash_array,url_hash)) { // make sure the hash is in the array before continuing
      var first_fp_nav_href = $('.fp-nav:first').attr('href'); // if hash_init is the same as this href, we don't do anything
      if (url_hash !== first_fp_nav_href) {
        $('.fp-nav.active').removeClass('active');
        $(a[href=url_hash]).addClass('active');
        fadingPages(url_hash);
      }
    }
  }

  function fadingPages(id) {    
    $('.fp-content-parent.on')
      .fadeOut(100,function(){
        toggleFadeState($(this));
      });
    $(id)
      .fadeIn(500,function() {
        toggleFadeState($(this));
      });
  }

  function toggleFadeState(context) {
    $(context).toggleClass('on').toggleClass('off').removeAttr('style');
  }

  // Simple check if something is inside an array
  function isInArray(array,value) {
    for (var i = array.length; i--;) {
      if (value.indexOf(array[i]) > -1) return true;
    }
    return false;
  }

});