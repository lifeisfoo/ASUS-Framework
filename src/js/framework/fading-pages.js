$(document).ready(function() {

  // Hide all except for the first parent
  $('.fp-content-parent:not(:first)').addClass('off');
  $('.fp-content-parent:first').addClass('on');
  // First nav should also be active
  $('.fp-nav:first').addClass('active');

  var top_z_index = 99; // optionally used to align content
  var hash_array = $('.fp-nav').map(function() { // build an array of all the .fp-nav links to check
      return $(this).attr('href');
    }).toArray();
  var first_fp_nav_href = $('.fp-nav:first').attr('href');
  var pop = false;

  window.addEventListener('popstate', function()  {
    pop = true;
    var current_hash = window.location.hash;
    if (current_hash.length > 0) { // if hash is blank, load default
      hashChange(current_hash);
    } else {
      hashChange(first_fp_nav_href);
    }
  });

  if (!pop) { // popstate not supported
    $('.fp-nav').click(function() {
      if (!$(this).hasClass('active')) {
        $('.fp-nav.active').removeClass('active');
        $(this).addClass('active');
        fadingPages($(this).attr('href'));
      }
    });
  }
  
  function hashChange(url_hash) {
    var current_fp_nav_href = $('.fp-nav.active').attr('href');
    if (isInArray(hash_array,url_hash)) { // make sure the hash is in the array before continuing
      if (url_hash !== current_fp_nav_href) { // Don't do anything if we're already on the page
        $('.fp-nav.active').removeClass('active');
        $('a[href="' + url_hash + '"]').addClass('active');
        fadingPages(url_hash);
      }
    } else { // if we get a bad hash, go back to first page
      $('a[href="' + first_fp_nav_href + '"]').addClass('active');
      fadingPages(first_fp_nav_href);
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

  // Simple check if something is inside an array (exact match)
  function isInArray(array,value) {o
    return (array.indexOf(value) !== -1) ? true : false;
  }

});