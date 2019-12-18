
$(document).ready(function(){
       
    //TweenLite.defaultEase = Linear.easeNone;

    var controller = new ScrollMagic.Controller();
    var tl = new TimelineMax();

    var ww = window.innerWidth;

    var noSlides, slideWidth, slideContainerWidth;
    noSlides = $(".commonSlide").length;
    let num = 0;

    $(".commonSlide").each(function() {
        slideWidth = $(this).outerWidth();
        num += slideWidth
    });
    var slideContainerWidth = num-ww;

    function createHorizontal() {
        return new ScrollMagic.Scene({
        triggerElement: ".scrollWrapper",
        triggerHook: "onLeave",
        duration: slideContainerWidth
        })
        .setPin(".scrollWrapper")
        .setTween(new TimelineMax().to(".slideContainer", 1, {x: -slideContainerWidth}))
        .addTo(controller);
    }

    const scene = new ScrollMagic.Scene({
        triggerElement: ".scrollWrapper",
        triggerHook: "onLeave",
        duration: slideContainerWidth
    }).addTo(controller);


    let lengthofSlide = 0;

    scene.on("update", e =>{
        lengthofSlide = e.scrollPos
    })

    if ($(window).width() < 767) {
        console.log('Mobile Device');
    }
    else {
        createHorizontal(); 

        $(".hamBurgerIcon").mouseenter(function(){
            tl.fromTo('nav', 0, {display : "none"}, {display : "block", ease: Power2.easeInOut})
            .fromTo('nav ul', 1, {right : "-100%", opacity: "0"}, {right : "0%",opacity: "1"},"-=0")
        });   
    }

    function arrowNext(arrow){
        lengthofSlide += 400
        if(lengthofSlide >= slideContainerWidth){
            tl.to(".slideContainer", 1, {x: 0})
        }
        else{
            tl.to(".slideContainer", 1, {x: -lengthofSlide})
        }
    }
    // function arrowPrev(arrow){
        
    // }


    let vid = document.getElementById("aboutVideo"); 

    $("#next").click(function(){
        arrowNext(this)
    });
    $("#prev").click(function(){
        arrowPrev(this)
    });

    $(".playButton").html(`<span><i class="fa fa-play" id="playButton" aria-hidden="true"></i></span>`)
    
    $("body").on("click", "#playButton", function(){
        vid.play();
        $(".playButton").html(`<span><i class="fa fa-pause" id="pauseButton" aria-hidden="true"></i></span>`)
        $('.aboutHeader').fadeOut()
    });
    

    $("body").on("click", "#pauseButton", function(){
        vid.pause();
        $(".playButton").html(`<span><i class="fa fa-play" id="playButton" aria-hidden="true"></i></span>`)
    });

    

    $(".hamBurgerIcon").click(function(){
        tl.fromTo('.menuDiv', 0, {  display: 'none'}, { display: 'flex'})
        .fromTo($('.singleMenu1>div'), 0.3, {left: "-100%", width:"0"}, { left: "0%", width:"100%"},'-=0')
        .fromTo($('.singleMenu2>div'), 0.6, {left: "-100%", width:"0"}, { left: "0%", width:"100%"},'-=0.3')
        .fromTo($('.singleMenu3>div'), 0.9, {left: "-100%", width:"0"}, { left: "0%", width:"100%"},'-=0.6')
        .fromTo($('.closeBtn'), 2, {display: "none"}, { display: "block"})
    });
    $('.closeBtn').click(function(){
        tl
        .fromTo($('.singleMenu1>div'), 0.3, {left: "0%", width:"100%"}, { left: "100%", width:"0%"},'-=0')
        .fromTo($('.singleMenu2>div'), 0.6, {left: "0%", width:"100%"}, { left: "100%", width:"0%"},'-=0.3')
        .fromTo($('.singleMenu3>div'), 0.9, {left: "0%", width:"100%"}, { left: "100%", width:"0%"},'-=0.6')
        .fromTo($('.closeBtn'), 0, {display: "block"}, { display: "none"}, '-=0.9')
        .fromTo('.menuDiv', 1.5, {  display: 'flex'}, { display: 'none'}, "-=1.2")
        
    });

    const slideLength  = $('.slideImage');
    slideLength.map((index) =>
        tl.fromTo(`.slideImage:nth-child(${index+1})`, 0.3, {height: "0%"}, {height: "100%", ease: Power2.easeInOut})
    )
});






  
// $(window).resize(function(){

//   ww = window.innerWidth;
//   slideContainerWidth = slideWidth*noSlides-ww;

  
//   horizontal.destroy(true);
//   horizontal = createHorizontal();

// });
  


