/* jslint browser: true */
/* global $, gsap */

// hide all screens and section divs
$("main, section").hide(); // set display: none to main/section divs in css to stop flash

// SPLASH SCREEN //////////////////////////////////////////////

// display splash screen
$("#splash").show();

// animate on the splash screen on app load
gsap.from("#splash", {
    delay: 0.25,
    opacity: 0,
    duration: .5
});





gsap.from("#splash img", {
    delay: 1,
    scale: 0,
    duration: 1,
    ease: "circ"
});

// wait 4 secs then fade out and load landing screen
gsap.to("#splash", {
    delay: 4,
    opacity: 0,
    duration: 1,
    onComplete: loadLanding
});



function loadLanding(){
    // hide and reset all screens/sections
    $("main, section").hide().css({opacity: 1});

    // ************************ SHOW ************************
    // display landing screen
    $("#landing").show();

    //  animate on the landing screen
    gsap.from("#landing", {
        delay: 0.25,
        opacity: 0,
        duration: 0.5
    });

    gsap.from("#landing header", {
        delay: 0.5,
        y: -$("#landing header").outerHeight(),
        duration: 0.5,
        ease: "back.out(1.7)"
    });

    gsap.from("#landing footer", {
        delay: 0.5,
        y: $("#landing footer").outerHeight(),
        duration: 0.5,
        ease: "power1.in"
    });

    gsap.from("#logo1", {
        delay: 1,
        opacity: 0,
        duration: 0.5
    });

    gsap.from("#logo2", {
        delay: 1.25,
        opacity: 0,
        duration: 0.5
    });

    gsap.from("#logo3", {
        delay: 1.5,
        opacity: 0,
        duration: 0.5
    });
}

// Part of the landing screen but not part of the loading function
// set up logos to link to related restaurant
// pass rest ID and subnav highlight colour to loadRest function
// fade landing out and load selected restaurant

$("#logo1").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        // TWO PARAMETERS HIGHLIGHT AND ID OF RESTAURANT
        // WHICH ICON IS ACTIVE IS HEX CODE
        onCompleteParams: ["#rest1", "#fcad10"]
    });
});

$("#logo2").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest2", "#36963e"]
        // loadRest("#rest1", "#630000" )
    });

});

$("#logo3").click(function() {

    gsap.to("#landing", {
        opacity: 0,
        duration: 0.5,
        onComplete: loadRest,
        onCompleteParams: ["#rest3", "#3866b2"]
    });
});


// RESTAURANT SCREENS


function loadRest(restID, highlightColour){

    // Hide landing screen
    $("#landing").hide();

    // Display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    
    gsap.from(restID + " header", {
        delay:0.25,
        y: -$(restID + " header").outerHeight(),
        duration: 0.5,
        ease: "sin.out"
    });

    gsap.from(restID + " footer", {
        delay:0.25,
        y: $(restID + " footer").outerHeight(),
        duration: 0.5,
        ease: "sin.in"
    });

    // LOAD HOMESCREEN
    $(restID + " .home").show();

    // animate on home section 
    gsap.from(restID + " .home", {
        delay: 0.75,
        opacity: 0,
        duration: 0.5, 
    });

    // Animate on home sction

    // Loop through and reveal all elements on home screen with .reveal class applied
    $(restID + " .home .reveal").each(function(i) {

        // console.log(restID + " .home .reveal");
        // console.log(i);

        gsap.from(this, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            y: -100,
            duration: 1,
            ease:"bounce.out" 
        });
    });

    // create var to target icons from selected restaurant
   let iconsTarget = restID + " .homeIcon,"  + restID + " .specialsIcon," + restID + " .reservationsIcon";
    
 
   console.log(iconsTarget);
    //  remove highlight and active class from all icons
    $(iconsTarget).css({background: "none"}).removeClass("active");

    //* Same as old
    //  highlight home icon and add class to load restaurant page
    $(restID + " .homeIcon").css({background: highlightColour}).addClass("active");

    // set up section nav - highlight and load section
    $(iconsTarget).click(function() {

        // Check if selected button has active class....it is doesn't run this code
        if(!$(this).hasClass("active")) {

            console.log("not active");

            // renive highlight and active class from all icons
            $(iconsTarget).css({background: "none"}).removeClass("active");

            // add highlight and active class to selected icon based on highlight colour
            $(this).css({background: highlightColour}).addClass("active");

            // MAKE SURE YOU WRITE THE FUNCTION load selected section - send current section and section to load
            //  MAKE SURE YOU PUT A SPACE IN THE QUOTES
            loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
        }
    });
}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////
// function for loading internal restaurant sections

// Function for loading internal restaurant sections
function loadSection(prevSection, nextSection) {
    // Fade out previous section
    gsap.to(prevSection, {
        opacity: 0,
        duration: 0.5,
        onComplete: function() {
            // Hide and reset previous section
            $(prevSection).hide().css({ opacity: 1 });
            // Display next section
            $(nextSection).show().scrollTop(0);
        }
    });

    // Animate the next section
    gsap.from(nextSection, {
        delay: 0.5,
        opacity: 0,
        duration: 0.5
    });

    // Loop through and reveal all elements on the next screen with the reveal class applied
    $(nextSection + " .reveal").each(function(i) {
        gsap.from(this, {
            delay: 1 + i * 0.15,
            opacity: 0,
            y: -10,
            duration: 1,
            ease: "sin.out" 
        });
    });
    $(nextSection + " .revs").each(function(i) {
        gsap.from(this, {
            delay: 2 + i * 0.15,
            opacity: 0,
            y: -10,
            duration: 1,
            ease: "sin.out"
        });
    });
}

// Set up reservations submit button
$(".res1").click(function(e) {
    e.preventDefault();
    $("#rest1 header, #rest1 footer").css({ opacity: 0 });
    // Load the .booking section
    loadSection("#rest1 section", "#rest1 .booking");
});
$(".res2").click(function(e) {
    e.preventDefault();
    $("#rest2 header, #rest2 footer").css({ opacity: 0 });
    // Load the .booking section
    loadSection("#rest2 section", "#rest2 .booking");
});
$(".res3").click(function(e) {
    e.preventDefault();
    $("#rest3 header, #rest3 footer").css({ opacity: 0 });
    // Load the .booking section
    loadSection("#rest3 section", "#rest3 .booking");
});

//! set up hamburger menu to reveal main menu
$(".hamburger").click(function() {

    // check the current state of the button
    if ($(this).attr("src") === "img/close2hamburger.gif") {

        // console.log("close2Hambuger");
        // Change the button image source to the close image
        $(this).attr("src", "img/hamburger2close.gif");
    
        // display menu screen
        $("#menu").show();
    
        // set the z-index of the menu element instantly
        gsap.set("#menu", {
            zIndex: 999
        });
    
        // animate current restaurant over to reveal menu
        gsap.to("#menu", {
            opacity:1,
            x: 365,
            duration: .6,
            ease: "sine.out",
        });
    
        // modified menu 
        gsap.to(".rest", {
            filter: 'brightness(50%)',
            duration: 0.5,
            ease: "sine.out",
            zIndex: -999,
        });
    
    } else {
        // change the button image to open image
        $(this).attr("src", "img/close2hamburger.gif");
    
        // rest back to default
        gsap.to(".rest", {
            filter: 'brightness(100%)',
            duration: 0.5,
            ease: "sine.in"
        });
       // animate restaurant back to hide menu
       
gsap.to("#menu", {
    x: 0,
    opacity:0,
    duration: 1,
    ease: "sine.out",
    onComplete: function () {
        // hide menu
        $("#menu").hide();
    }
});

// modified menu 
gsap.to(".rest", {
    opacity: 1,
    duration: 0.5,
    ease: "sine.out",
});
        
    }
});


// set up main menu links
// go back to landing screen

function bckToLanding(){
    // change button image source to hamburger image
    $(".hamburger").attr("src", "img/close2hamburger.gif");

    // animate the restarant back
    gsap.to(".rest",{
        x: 0,
        duration: 0.1,
        filter: 'brightness(100%)',
        ease: "sine.out",
        onComplete: function() {

            // hide menu
            $("#menu").hide();
            
            // fade out and go to landing screen
            gsap.to("main", {
                opacity: 0,
                duration: 0.5,
                onComplete: loadLanding
            });
        }
    })
}

$("#backToLanding").click(function() {
    bckToLanding();
    
});


// reveal FoE contact info   
$("#contact-trigger").hide();
$("#contact").click(function(){
    $("#address-trigger").hide();
    $("#about-trigger").hide();
    $("#contact-trigger").fadeIn(700);
});  
$(".trigger-button").click(function(){
    $("#contact-trigger").fadeOut(700);
    
});  


// reveal FoE adress info   
$("#address-trigger").hide();
$(".address1").click(function(){
    $("#contact-trigger").hide();
    $("#about-trigger").hide();
    $("#address-trigger").fadeIn(700);
});  
$(".trigger-button").click(function(){
    $("#address-trigger").fadeOut(700);
    
});  
// reveal FoE about info   
$("#about-trigger").hide();
$("#about").click(function(){
    $("#address-trigger").hide();
    $("#contact-trigger").hide();
    $("#about-trigger").fadeIn(700);
});  
$(".trigger-button").click(function(){
    $("#about-trigger").fadeOut(700);
    
});  



// Home Button 

$(".btn1").click(function(){

    bckToLanding(),
    setTimeout(function() {
        $("#rest1 header, #rest1 footer").css({ opacity: 1 });
    }, 500); 
});
$(".btn2").click(function(){

    bckToLanding(),
    setTimeout(function() {
        $("#rest2 header, #rest2 footer").css({ opacity: 1 });
    }, 500); 
});
$(".btn3").click(function(){

    bckToLanding(),
    setTimeout(function() {
        $("#rest3 header, #rest3 footer").css({ opacity: 1 });
    }, 500); 
});


// Function for getting name 

function getName(){
    let name = $("#name").val();
  let message = "Thanks for confirming, " + name +"!"; 
  $(".bk1").html(message);
  console.log(message);
}

$(".reserve").click(function(){
     getName()
})