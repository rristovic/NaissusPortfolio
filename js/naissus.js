(function($) {
  // "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 500, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });
  
  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  //========================================
  //         PORTFOLIO SECTION
  //========================================
  var jssor_1_options = {
    $AutoPlay: 1,
    $Idle: 0,
    $SlideDuration: 10000,
    $SlideEasing: $Jease$.$Linear,
    $PauseOnHover: 4,
    $SlideWidth: 350,
    $Cols: 3,
    $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,
                $ChanceToShow: 2
    }
  };

  portfolioSlider = new $JssorSlider$("jssor_1", jssor_1_options);

  $('.portfolio-section .slider_right').click(function(){
    var count = portfolioSlider.$SlidesCount();
    var curIndex = portfolioSlider.$CurrentIndex();
    // Slide to next 3
    curIndex += 3;
    if(curIndex >= count) {
      curIndex = curIndex - count;
    }      

    slideTo(curIndex);
  });
  $('.portfolio-section .slider_left').click(function(){
    var count = portfolioSlider.$SlidesCount();
    var curIndex = portfolioSlider.$CurrentIndex();
    // Slide to prev 3
    curIndex -= 3;
    if(curIndex < 0) {
      curIndex = count + curIndex;
    }
    slideTo(curIndex);      
  }); 

  function slideTo(index) {
    var slides = $('.slides');
    portfolioSlider.$GoTo(index);
    // Slider autoplay fix
    var i = setInterval(function() {
      slides.simulate("drag", {dy: 1});  
      slides.simulate("mouseenter");     
      slides.simulate("mouseleave");  
      clearInterval(i);
    }, 1000);    
  };

   // Hover function for potfolio items
  $('#portfolio .portfolio-item .portfolio-link').hover(
    function(e) {
        $(e.currentTarget).find('.caption').css("opacity", 1);
  }, function(e) {
        $(e.currentTarget).find('.caption').css("opacity", 0);
  });
  
  // Portfolio slider thumbnail click listener
  $('.portfolio-item .portfolio-link').click(function(e) {
    var modalIndexToOpen = $(e.currentTarget).data('index');
    var modalToOpen = $(portfolioArray[modalIndexToOpen]);
    replaceModalAndShow(modalToOpen);
  });

  // Portfolio slider links click listener
  $('.slider-links span').click(function(e) {
    switch($(e.target).data('link')){
      case 'ad': {
        slideTo(3);
        break;
      }
      case 'wd': {
        slideTo(0);
        break;
      }
      case 'gd': {
        slideTo(6);
        break;
      }
      default: {
        break;
      }
    }
  });

  // Portofolio modals
  var portfolioArray = [];
  var size = $('.portoflio-modal-content').length;
  for (var i = 1; i <= size; i++) {
    portfolioArray.push('#portfolioModal' + i);
  }

  // Portfolio modal navigation
  function navClick(e) {
    var curModal = $(e.target).closest('.portoflio-modal-content');
    var isLeftClicked = e.target.classList.contains('left-nav');
    var curModalIndex = curModal.data("index");

    if(isLeftClicked) { // Nav to the left
      var nextModalIndex = curModalIndex - 1;
      if(nextModalIndex === -1) {
        nextModalIndex = size - 1;
      }
    } else { // Nav to the right
      var nextModalIndex = curModalIndex + 1;
      if(nextModalIndex === size) {
        nextModalIndex = 0;
      }
    }
    // show modal
    replaceModalAndShow($(portfolioArray[nextModalIndex]));
  };

  // Show modal in modal holder
  function replaceModalAndShow(newModal) {
    var modalHolder = $('#portfolioModalHolder');
    // Turn off click listener for previous model
    var navigation = modalHolder.children().eq(0).find('.navigation');
    if(navigation){
      navigation.off('click');
    }
    // Replace modal holder container with modal
    modalHolder[0].innerHTML = newModal[0].innerHTML;
    modalHolder.children(0).show();
    // Show modal if previously not shown
    if(!modalHolder.hasClass('show')){
      modalHolder.modal('show');
    }
    // Turn on click listeners
    modalHolder.children().eq(0).find('.navigation').click(navClick);

    // Load images
    loadImages(modalHolder);
   
  }

  // Lazy loading modal images
  function loadImages(modal) {
   var imgs = modal.find('img.image-to-load');
   for (var i = imgs.length - 1; i >= 0; i--) {
        // Replace original modal images
        var modalImg = imgs.eq(i);
        modalImg.attr('src', modalImg.data('src'));
        modalImg[0].onload = function(e) {
          var imageToShow = $(e.target);
          $(e.target).next().fadeOut(400, function() {
            imageToShow.fadeIn(400, function() {
              imageToShow.removeClass('image-to-load');
            });
          });
        };
        console.log("replacing images");
    }        
  }

  $(document).keydown(function(e) {
    var modalHolder = $('#portfolioModalHolder');
    if(modalHolder.hasClass('show'))
      switch(e.which) {
          case 37: {// left arrow
            // Workaround for currentTarget event property
            navClick({target:modalHolder.find('.left-nav')[0]})
            e.preventDefault();  
            break;
          };
          case 39: {// right arrow
            // Workaround for currentTarget event property
            navClick({target:modalHolder.find('.right-nav')[0]})
            e.preventDefault();  
            break;
          };
          case 27: {// Esc
            modalHolder.modal('hide');            
            e.preventDefault();  
            break;
          };
          default: return; // exit this handler for other keys
        }
      });
})(jQuery); // End of use strict




