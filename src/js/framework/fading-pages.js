/*
Fading Pages module plugin for ASUS Framework

This plugin is used meant to be used as AJAX page-wide navigation where history
needs to be retained. More than one fading pages system cannot be installed on the
same page due to this.

This plugin requires JavaScript, jQuery 1.0+
*/

$(document).ready(function() {

  // Hide all except for the first parent
  $('.fp-content-parent:not(:first)').addClass('off');
  $('.fp-content-parent:first').addClass('on');
  // First nav should also be active
  $('.fp-nav:first').addClass('active');

  var hash_array = $('.fp-nav').map(function() { // build an array of all the .fp-nav links to check
      return $(this).attr('href');
    }).toArray();
  var first_fp_nav_href = $('.fp-nav:first').attr('href');
  var fadeOut_speed = 100;
  var fadeIn_speed = 500;
  var total_fading_speed = fadeOut_speed + fadeIn_speed;
  
  // Initial page load functions
  var initial_hash = window.location.hash;
  if (initial_hash.length > 0) { hashChange(initial_hash); } // fade to section on page load
  setPreviousNext(first_fp_nav_href); // set correct previous/next href on page load

  if (document.addEventListener) {
    window.addEventListener('hashchange', function() {
      hashChange(window.location.hash);
    });
  } else {
    document.attachEvent('hashchange', function() {
      hashChange(window.location.hash);
    });
  }

  // main controller
  function hashChange(url_hash) {
    var current_fp_nav_href = $('.fp-nav.active').attr('href');
    if (url_hash.length > 0 && isInArray(hash_array,url_hash)) { // if hash is blank or bad, load default
      if (url_hash !== current_fp_nav_href) {
        toggleNavState(url_hash);
        fadingPages(url_hash);
        setTimeout(function(){
          setPreviousNext(url_hash);
        }, total_fading_speed); 
      }
    } else {
      hashChange(first_fp_nav_href);
    }          
  }

  // controls animation and class juggling
  function fadingPages(id) {    
    $('.fp-content-parent.on')
      .fadeOut(fadeOut_speed,function(){
        toggleFadeState($(this));
      });
    $(id)
      .fadeIn(fadeIn_speed,function() {
        toggleFadeState($(this));
      });
  }

  // fire when you need to reset attr('href') on the previous/next links
  function setPreviousNext(current_id) {
    $('.fp-previous').attr('href', getPrevious(current_id));
    $('.fp-next').attr('href', getNext(current_id));
  }

  function getPrevious(current_id) {
    if ($(current_id).prev().length > 0) {
      return '#' + $(current_id).prev().attr('id');
    } else {
      return '#' + $('.fp-content-parent:last').attr('id');
    }
  }

  function getNext(current_id) {
    if ($(current_id).next().length > 0) {
      return '#' + $(current_id).next().attr('id');
    } else {
      return '#' + $('.fp-content-parent:first').attr('id');
    }
  }

  function toggleFadeState(context) {
    $(context).toggleClass('on').toggleClass('off').removeAttr('style');
  }

  function toggleNavState(href) {
    $('.fp-nav.active').removeClass('active');
    $('a[href="' + href + '"].fp-nav').addClass('active');
  }

  // Simple check if something is inside an array (exact match)
  function isInArray(array,value) {
    return (array.indexOf(value) !== -1) ? true : false;
  }

});