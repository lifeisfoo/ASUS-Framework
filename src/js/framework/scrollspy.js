$(document).ready(function() {

  if ($('.scrollspy-header').length) {

    var lastId,
        topMenu = $('.scrollspy-header'),
        topMenuHeight = topMenu.outerHeight() + topMenu.offset().top,
        // All list items
        menuItems = topMenu.find('a'),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr('href'));
          if (item.length) { return item; }
        });

    $(window).scroll(function(){
      // Get container scroll position
      var fromTop = $(this).scrollTop()+topMenuHeight;
       
      // Get id of current scroll item
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      // Get the id of the current element
      cur = cur[cur.length-1];
      var id = cur && cur.length ? cur[0].id : '';

      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        $('.scrollspy-header a').removeClass('active');        
        $('[href=#'+id+']').addClass('active');
      }                   

    });

  }

});