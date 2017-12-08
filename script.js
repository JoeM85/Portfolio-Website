$(document).ready(function () {

    AOS.init();

    /* Navbar background change*/
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 150) {
            $(".navbar-default").css("background", "rgb(27, 36, 47)");
        } else {
            $(".navbar-default").css("background", "rgba(27, 36, 47, .4)");
        }
    })


    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".navbar",
        offset: 150
    });
    // Add smooth scrolling on all links inside the navbar
    $(".navbar a, .my-work-btn").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

    /*----Logo hover change----*/
    $('.hover-change').hover(function () {
        this.src = '/imgs/logo-reverse.png';
        $(".navbar-fixed-top").css("border-color", "#c94c4c")
    }, function () {
        this.src = '/imgs/my-logo.png';
        $(".navbar-fixed-top").css("border-color", "#04ced6")
    });

    /* Animations */

    $('.about-img-appear, .about-appear').waypoint(function (direction) {
        $('.about-img-appear, .about-appear').addClass('animated fadeIn')
    }, {
        offset: '70%'
    })
/*
    $('.portfolio-appear').waypoint(function (direction) {
        $('.portfolio-appear').addClass('animated fadeIn')
    }, {
        offset: '50%'
    })

    $('.contact-appear').waypoint(function (direction) {
        $('.contact-appear').addClass('animated fadeIn')
    }, {
        offset: '45%'
    })

    $('.about-title-slide-left').waypoint(function (direction) {
        $('.about-title-slide-left').addClass('animated fadeInLeft')
    }, {
        offset: '40%'
    })

    $('.contact-title-slide-down').waypoint(function (direction) {
        $('.contact-title-slide-down').addClass('animated fadeInDown')
    }, {
        offset: '25%'
    })

    $('.about-txt-slide-right').waypoint(function (direction) {
        $('.about-txt-slide-right').addClass('animated fadeInRight')
    }, {
        offset: '65%'
    })

    $('.portfolio-slide-right').waypoint(function (direction) {
        $('.portfolio-slide-right').addClass('animated fadeInRight')
    }, {
        offset: '50%'
    })

    $('.portfolio-slide-left').waypoint(function (direction) {
        $('.portfolio-slide-left').addClass('animated fadeInLeft')
    }, {
        offset: '50%'
    })*/
})
