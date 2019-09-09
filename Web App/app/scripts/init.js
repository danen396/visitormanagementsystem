(function($){
  $(function(){

    // Check browser support
    if (typeof(Storage) !== "undefined") {
       // Store
       themeColor = localStorage.getItem("themeColor");
      if(themeColor == undefined)
      {
        localStorage.setItem("themeColor", "#2962ff");
        themeColor = '#2962ff';
       }

       //got Theme COlor from storage update UI
       updateThemeColor(themeColor);

        } else {
       Materialize.toast("Sorry, your browser does not support Web Storage...", 4000)
       }
    //----------Configure Service Workers ---------------->

    registerServiceWorker();

    // askPermission();

    //-----------Configure Materialize CSS ----------------

    // Initialize collapse button
     $(".button-collapse").sideNav();
     //iniotailize parallax
     $('.parallax').parallax();
     //Initialize Dialog
     $('.modal').modal();
     //Hide Progres Bar once loaded
     $("#progress").hide();
     //Drop Down Menu
     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

      $('.timepicker').pickatime({
         default: 'now', // Set default time: 'now', '1:30AM', '16:30'
         fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
         twelvehour: true, // Use AM/PM or 24-hour format
         donetext: 'OK', // text for done-button
         cleartext: 'Clear', // text for clear-button
         canceltext: 'Cancel', // Text for cancel-button
         autoclose: false, // automatic close timepicker
         ampmclickable: true, // make AM PM clickable
         aftershow: function(){} //Function for after opening timepicker
       });

  //Chips Starts
  $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });

  $('.datepicker').pickadate({
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 15, // Creates a dropdown of 15 years to control year,
   today: 'Today',
   clear: 'Clear',
   close: 'Ok',
   closeOnSelect: false // Close upon selecting a date,
 });

  function updateThemeColor(themeColor)
  {
    $(".nav-wrapper").css("background-color", themeColor);
    $(".nav-wrapper").css("background-color", themeColor);
    $(".nav").css("background-color", themeColor);
    $( "#AppBar" ).css("background-color", themeColor);
    $(".secondary-content>.material-icons").css("color", themeColor);
    $(".btn").css("background-color", themeColor);
    $(".page-footer").css("background-color",themeColor);
    $(".input-field").css("color", themeColor);
    $(".input-field>.material-icons").css("color", themeColor);
    $(".input-field>label").css("color",themeColor);
    $(".dropdown-content>li>a").css("color", themeColor);
  }

  $("#toggleThemeColor").click(function(){
     var themeColor = getRandomColor();
     updateThemeColor(themeColor);
     // Update Theme Color

      if (typeof(Storage) !== "undefined") {
       // Store
       localStorage.setItem("themeColor", themeColor);

      } else {
     Materialize.toast("Sorry, your browser does not support Web Storage...", 4000)
      }
    });

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
        }
    return color;
     }

/*
* Install Service Worker
*/
function registerServiceWorker() {
  return navigator.serviceWorker.register('./service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    return registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

function cacheAppShell()
{
  self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/home.html',
        '/form.html',
        '/about.html',
        '/report.html',
        '/index.html',
        '/manifest.json',
        '/assets/img/icon.png',
        '/assets/img/header/head_home.png',
        '/assets/img/header/head_home.png',
        '/assets/img/PlaceHolder/user_place_holder.png',
        '/script/init.js',
        '/styles/style.css',
      ]);
    })
  );
});
}

  }); // end of document ready
})(jQuery); // end of jQuery name space
