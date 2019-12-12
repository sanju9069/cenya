$(document).ready(function(){
    //TweenLite.defaultEase = Linear.easeNone;

    var controller = new ScrollMagic.Controller();
    var tl = new TimelineMax();

    var ww = window.innerWidth;

    var noSlides = $(".commonSlide").length;
    var slideWidth = $(".commonSlide").width();
    var slideContainerWidth = slideWidth*noSlides-ww;

    function createHorizontal() {
        return new ScrollMagic.Scene({
        triggerElement: ".scrollWrapper",
        triggerHook: "onLeave",
        duration: slideContainerWidth
        })
        .setPin(".scrollWrapper")
        .setTween(actionHorizontal)
        .addTo(controller);
    }

    if ($(window).width() < 767) {
        console.log('Mobile Device');
    }
    else {
        var actionHorizontal = new TimelineMax()
        .to(".slideContainer", 1, {x: -slideContainerWidth})
        var horizontal = createHorizontal(); 
    }
    
    $(".hamBurgerIcon").click(function(){
        tl.fromTo('.menuDiv', 0, {height: "0%", left : "-100%"}, {height: "100%",left : "0%", ease: Power2.easeInOut})
        .fromTo('.menuDiv ul li:nth-child(1)', 1.5, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=0')
        .fromTo('.menuDiv ul li:nth-child(2)', 2, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=1.5')
        .fromTo('.menuDiv ul li:nth-child(3)', 2.5, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=2')
        .fromTo('.closeBtn', 2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
    });
    $('.closeBtn').click(function(){
        tl
        .fromTo('.menuDiv ul li:nth-child(1)', 0, { opacity:'1', x: 0}, { opacity:'0', x: -750, ease: Power2.easeInOut})
        .fromTo('.menuDiv ul li:nth-child(2)', 0.5, { opacity:'1', x: 0}, { opacity:'0', x: -750, ease: Power2.easeInOut}, '-=0')
        .fromTo('.menuDiv ul li:nth-child(3)', 1, { opacity:'1', x: 0}, { opacity:'0', x: -750, ease: Power2.easeInOut}, '-=0.5')
        .fromTo('.closeBtn', 0, {opacity: "1"}, {opacity: "0", ease: Power2.easeInOut}, "-=1")
        .fromTo('.menuDiv', 0.5, {height: "100%", left : "0%"}, {height: "0%",left : "-100%", ease: Power2.easeInOut}, "-=1")
        
    });

    const slideLength  = $('.slideImage');
    slideLength.map((index) =>
        tl.fromTo(`.slideImage:nth-child(${index+1})`, 0.3, {height: "0%"}, {height: "100%", ease: Power2.easeInOut})
    )
});


$(window).on('load', function(){ 
    $('.overLay').hide();
    $('.loader').hide();
});


  
// $(window).resize(function(){

//   ww = window.innerWidth;
//   slideContainerWidth = slideWidth*noSlides-ww;

  
//   horizontal.destroy(true);
//   horizontal = createHorizontal();

// });
  


