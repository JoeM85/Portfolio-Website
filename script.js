$(document).ready(function () {

    AOS.init();

    /* Navbar background change*/
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
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
            let hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

    /*----Logo hover change----*/
//    $('.hover-change').hover(function () {
//        this.src = '/imgs/logo-reverse.png';
//        $(".navbar-fixed-top").css("border-color", "#c94c4c")
//    }, function () {
//        this.src = '/imgs/my-logo.png';
//        $(".navbar-fixed-top").css("border-color", "#04ced6")
//    });
      
    //Random Stars
    const generateStars = () => {

        const $galaxy = $(".galaxy");
        let iterator = 0;
        while (iterator <= 70) {
            const xposition = Math.random();
            const yposition = Math.random();
            const star_type = Math.floor((Math.random() * 3) + 1);
            const position = {
                "x": $galaxy.width() * xposition,
                "y": $galaxy.height() * yposition,
            };
            $('<div class="star star-type' + star_type + '"></div>').appendTo($galaxy).css({
                "top": position.y,
                "left": position.x
            });
            iterator++;
        }
    };

    generateStars();

    function getDocHeight() {
        const D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        )
    };

    let winheight, docheight, trackLength, throttlescroll;
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    function getmeasurements() {
        winheight = window.innerHeight || (document.documentElement || document.body).clientHeight;
        docheight = getDocHeight();
        trackLength = docheight - winheight;
    };

    function amountscrolled() {
      const mySvgImg = document.querySelector("#my-photo-svg");
      const myPhoto = document.querySelector(".my-photo");
      const mySvgBackground = document.querySelector("#background");
      const mySvgCupBottom = document.querySelector(".st1");
      const mySvgCup = document.querySelector(".st2");
      const mySvgShirt = document.querySelector(".st3");
      const mySvgHair = document.querySelectorAll(".st4");
      const mySvgSkin = document.querySelectorAll(".st6");
      const scrollTop = window.pageYOffset;
      const pctScrolled = Math.floor(scrollTop / trackLength * 100);
        if(width <= 500) {
            getAmountScolled(15, 26);
        } else if(width <= 766 && width >= 501) {
            getAmountScolled(13, 26);
        } else if(width <= 1066 && width >= 767) {
            getAmountScolled(32, 50);
        } else if(width >= 1067) {
            getAmountScolled(24, 45);
        }
        
        function getAmountScolled(num1, num2) {
        if(pctScrolled > num1 && pctScrolled < num2) {
            mySvgImg.classList.add("me-drawing");
            myPhoto.style.opacity = ".8";
            mySvgBackground.classList.add("background-color");
            mySvgCupBottom.classList.add("st1-color");
            mySvgCup.classList.add("st2-color");
            mySvgShirt.classList.add("st3-color");
            mySvgHair.forEach(color => color.classList.add("st4-color"));
            mySvgSkin.forEach(color => color.classList.add("st6-color"));
      } else {
            mySvgImg.classList.remove("me-drawing");
            myPhoto.style.opacity = "1";
            mySvgBackground.classList.remove("background-color");
            mySvgCupBottom.classList.remove("st1-color");
            mySvgCup.classList.remove("st2-color");
            mySvgShirt.classList.remove("st3-color");
            mySvgHair.forEach(color => color.classList.remove("st4-color"));
            mySvgSkin.forEach(color => color.classList.remove("st6-color"));
      }
    }   
  };

    getmeasurements();

    window.addEventListener("resize", function () {
        getmeasurements();
    }, false);

    window.addEventListener("scroll", function () {
        clearTimeout(throttlescroll)
        throttlescroll = setTimeout(function () {
            amountscrolled();
        }, 250)
    }, false);
    //Hides navbar drop down on click
    if(width <= 844) {
        $('.nav a').on('click', function(){
            $('.navbar-toggle').click();
        }); 
    }
                                
});
    
