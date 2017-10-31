/*--------------------------------------------------------------
# Custom animations
--------------------------------------------------------------*/


// IIFE - Immediately Invoked Function Expression
(function($, window, document) {

    // The $ is now locally scoped

    // Listen for the jQuery ready event on the document
    $(function() {

        // The DOM is ready!

    });

    /*--------------------------------------------------------------
     # Menu
     --------------------------------------------------------------*/

    // open mobile menu on hamburger click
    window.addEventListener('load', function() {
        $('#menu-toggle').on('click', function() {
            $('#header').toggleClass('toggled');
        });

        $('.header__mainnav a').on('click', function() {
           $('#header').removeClass('toggled');
        });
    });

    /*--------------------------------------------------------------
     # Homepage banner typing effect
     --------------------------------------------------------------*/

    var options = {
        strings: ["Think", "Act", "Be"],
        typeSpeed: 100,
        backDelay: 2000,
        backSpeed: 50,
        loop: true,
    };
    var typed = new Typed(".type", options);

    /*--------------------------------------------------------------
     # Parallax effect using ScrollMagic
     --------------------------------------------------------------*/


    // init controller
    var controller = new ScrollMagic.Controller();
    var controllerMenu = new ScrollMagic.Controller();

    // Banner parallax
    var tween = new TimelineMax()
        .to("#banner .parallax-background", 2, {y: "40%", ease: Linear.easeNone})
        .to(".banner-content", 1.6, {opacity: 0, ease: Linear.easeNone}, '0');

    new ScrollMagic.Scene({
        triggerElement: "#banner",
        triggerHook: 0,
        duration: "100%"
    })
        .setTween(tween)
        .addTo(controller);

    // Who parallax
    var scene = new ScrollMagic.Scene({
        triggerElement: "#wie",
        triggerHook: 1,
        duration: "100"
    })
        .setTween("#wie .parallax-background", {y: "50%", ease: Linear.easeNone})
        .addTo(controller);

    // get the current duration value
    var duration = scene.duration();

    // use a function to automatically adjust the duration to the window height.
        var durationValueCache;
        function getDuration () {
            return durationValueCache;
        }
        function updateDuration (e) {
            durationValueCache = $('#wie').outerHeight(true) + window.innerHeight;
        }
        $(window).on("resize", updateDuration); // update the duration when the window size changes
        $(window).triggerHandler("resize"); // set to initial value
        scene.duration(getDuration); // supply duration method

    /*--------------------------------------------------------------
     # Menu selected using ScrollMagic
     --------------------------------------------------------------*/

    $wat = $('#wat');
    new ScrollMagic.Scene({triggerElement: "#wat", triggerHook: 0.5, duration: $wat.height()})
        .setClassToggle("#menu-wat", "active") // add class toggle
        .addTo(controllerMenu);
    $wie = $('#wie');
    new ScrollMagic.Scene({triggerElement: "#wie", triggerHook: 0.5, duration: $wie.height()})
        .setClassToggle("#menu-wie", "active") // add class toggle
        .addTo(controllerMenu);
    $deelnemen = $('#deelnemen');
    new ScrollMagic.Scene({triggerElement: "#deelnemen", triggerHook: 0.5, duration: $deelnemen.height()})
        .setClassToggle("#menu-deelnemen", "active") // add class toggle
        .addTo(controllerMenu);

    /*--------------------------------------------------------------
     # Smooth scrolling
     --------------------------------------------------------------*/

    var headerHeight = 84;

    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
        TweenMax.to(window, 1, {scrollTo: {y: newpos - headerHeight}, ease:Power2.easeInOut});
    });

    $(document).on("click", "a[href^='#']", function (e) {
        var id = $(this).attr("href");
        if ($(id).length > 0) {
            e.preventDefault();

            // trigger scroll
            controller.scrollTo(id);

            // if supported by the browser we can even update the URL.
            if (window.history && window.history.pushState) {
                history.pushState("", document.title, id);
            }
        }
    });

    /*--------------------------------------------------------------
     # Disable parallax on mobile using enquire.js
     --------------------------------------------------------------*/
    enquire.register("screen and (max-width:768px)", {
        match : function() {
            controller.destroy();
        }
    });


    /*--------------------------------------------------------------
     # Remove loader when page is loaded
     --------------------------------------------------------------*/
    $('body').addClass('loaded');


}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter