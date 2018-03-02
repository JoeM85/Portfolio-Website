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

})
