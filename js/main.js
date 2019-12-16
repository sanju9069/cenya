$(document).ready(function(){
    // loader script
    var fade = document.querySelector('.fade');
    //var title = document.querySelector('.title');

    var image = document.getElementsByTagName('img')[0];
    var aquarelle = new Aquarelle(image, '../images/nature-1.jpg', {
        autoplay: true,
        loop: true
    });

    aquarelle.addEventListener('created', function() {
        var canvas = this.getCanvas();
        canvas.removeAttribute('style');
        image.parentNode.insertBefore(canvas, image.nextSibling);
        image.parentNode.removeChild(image);
    });

    aquarelle.addEventListener('changed', function(event) {
        fade.style.opacity = this.transitionInRange(1, 1, 7183, 7933);
        var canvas = this.getCanvas();
        canvas.style.webkitFilter = 'blur(' + this.transitionInRange(0, 24, 3000) + 'px)';
        canvas.style.webkitTransform = canvas.style.transform = 'translate(-50%, -50%) scale(' + this.transitionInRange(.75, 1) + ')';
        
        //title.style.opacity = this.transitionInRange(0, 1, 0, 2016);
        //title.style.webkitTransform = title.style.transform = 'scale(' + this.transitionInRange(.8, 1, 0, 5883) + ')';

    });
        
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
    }

    function arrowNext(arrow){
        lengthofSlide += slideWidth
        if(lengthofSlide-slideWidth >= slideContainerWidth){
           // $(arrow).hide()
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

    
    tl.fromTo('nav', 0, {width : "0%"}, {width : "0%", ease: Power2.easeInOut})
    // $(".hamBurgerIcon").hover(function(){
    //     tl.fromTo('nav', 0, {width : "0%", opacity: "0"}, {width : "70%",opacity: "1", ease: Power2.easeInOut})
    // });
    
    $(".hamBurgerIcon").click(function(){
        tl.fromTo('.menuDiv', 0, {left : "-100%"}, {left : "0%", ease: Power2.easeInOut})
        .fromTo('.menuDiv ul li:nth-child(1)', 1.5, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=0')
        .fromTo('.menuDiv ul li:nth-child(2)', 2, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=1.5')
        .fromTo('.menuDiv ul li:nth-child(3)', 2.5, { opacity:'0', x: -750}, { opacity:'1', x: 0, ease: Power2.easeInOut}, '-=2')
        .fromTo('.closeBtn', 2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
    });
    $('.closeBtn').click(function(){
        tl
        .fromTo('.menuDiv ul li:nth-child(1)', 0, { opacity:'1', x: 0}, { opacity:'0', x: 750, ease: Power2.easeInOut})
        .fromTo('.menuDiv ul li:nth-child(2)', 0.5, { opacity:'1', x: 0}, { opacity:'0', x: 750, ease: Power2.easeInOut}, '-=0')
        .fromTo('.menuDiv ul li:nth-child(3)', 1, { opacity:'1', x: 0}, { opacity:'0', x: 750, ease: Power2.easeInOut}, '-=0.5')
        .fromTo('.closeBtn', 0, {opacity: "1"}, {opacity: "0", ease: Power2.easeInOut}, "-=1")
        .fromTo('.menuDiv', 0.5, { left : "0%"}, {left : "100%", ease: Power2.easeInOut}, "-=1")
        
    });

    const slideLength  = $('.slideImage');
    slideLength.map((index) =>
        tl.fromTo(`.slideImage:nth-child(${index+1})`, 0.3, {height: "0%"}, {height: "100%", ease: Power2.easeInOut})
    )
});



$(window).on('load', function(){ 
    setTimeout(function(){ 
        $('.loader').hide();
        $('.loader').remove()

     }, 1000);
   

});


  
// $(window).resize(function(){

//   ww = window.innerWidth;
//   slideContainerWidth = slideWidth*noSlides-ww;

  
//   horizontal.destroy(true);
//   horizontal = createHorizontal();

// });
  


