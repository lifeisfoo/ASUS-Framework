$(document).ready(function() {

  // Hide all except for the first parent
  $('.fp-content-parent:not(:first)').addClass('off');
  $('.fp-content-parent:first').addClass('on');
  // First nav should also be active
  $('.fp-nav:first').addClass('active');

  var top_z_index = 99; // optionally used to align content
<<<<<<< HEAD
  var hash_array = $('.fp-nav').map(function() { // build an array of all the .fp-nav links to check
      return $(this).attr('href');
    }).toArray();
  var first_fp_nav_href = $('.fp-nav:first').attr('href');

  window.addEventListener('popstate', function()  {
    var current_hash = window.location.hash;
    if (current_hash.length > 0) { // if hash is blank, load default
      hashChange(window.location.hash);
    } else {
      hashChange(first_fp_nav_href);
    }
  });
  
  function hashChange(url_hash) {
    if (isInArray(hash_array,url_hash)) { // make sure the hash is in the array before continuing
      var current_fp_nav_href = $('.fp-nav.active').attr('href');
      if (url_hash != current_fp_nav_href) {
=======

  window.addEventListener('popstate', function()  {
    hashChange(window.location.hash);
  });
  
  function hashChange(url_hash) {
    var hash_array = $('.fp-nav').map(function() { // build an array of all the .fp-nav links to check
      return $(this).attr('href');
    }).toArray();
    if (isInArray(hash_array,url_hash)) { // make sure the hash is in the array before continuing
      var current_fp_nav_href = $('.fp-nav.active').attr('href');
      if (url_hash !== current_fp_nav_href) {
>>>>>>> 4941604d78ec77b162922cb28ce86392c2f808a3
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
  function isInArray(array,value) {o
    for (var i = array.length; i--;) {
      if (value.indexOf(array[i]) > -1) return true;
    }
    return false;
  }

});