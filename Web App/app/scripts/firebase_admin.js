//-------------------------------------PROFILE MANAGMENT---------------------------
  //Other
  var name, email, photoUrl, uid, emailVerified;
  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyAnp5M7JKSQVsmRQF1A_luz43U2DFStQ6I",
    authDomain: "ecart-1d0ca.firebaseapp.com",
    databaseURL: "https://ecart-1d0ca.firebaseio.com",
    projectId: "ecart-1d0ca",
    storageBucket: "ecart-1d0ca.appspot.com",
    messagingSenderId: "404598332603"
  };

  firebase.initializeApp(config);
  var user = firebase.auth().currentUser;

  //Handle profile Pic selection
  function handleFileSelect(evt) {
                 var files = evt.target.files; // FileList object
                 // Loop through the FileList and render image files as thumbnails.
                 for (var i = 0, f; f = files[i]; i++) {
                   // Only process image files.
                   if (!f.type.match('image.*')) {
                     continue;
                   }
                   var reader = new FileReader();
                   // Closure to capture the file information.
                   reader.onload = (function(theFile) {
                     return function(e) {
                       // Render thumbnail.
                      /* var span = document.createElement('span');
                       span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                         '" title="', escape(theFile.name), '"/>'].join('');
                       document.getElementById('list').insertBefore(span, null); */
                       $("#profile_pic").attr("src",  e.target.result);
                         // Check browser support
                         if (typeof(Storage) !== "undefined") {
                           user = firebase.auth().currentUser;
                            if (user != null) {
                              Materialize.toast('Profile Pic updated' , 2000, 'rounded');
                             // Store
                             localStorage.setItem(user.uid, e.target.result);
                              }
                         } else {
                             Materialize.toast('Unable to set image, your web browser is not supported' , 2000, 'rounded');
                         }
                     };
   })(f);
           // Read in the image file as a data URL.
            reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  //get current signed in user credentials
  function getUser(){
       var user = firebase.auth().currentUser;
       if (user != null) {
            $("#id_user_name").val(user.displayName);
            $("#user_name").text(user.displayName);
            $("#user_mail").text(user.email);
           // Retrieve image path from web storage
           $("#profile_pic").attr("src",  localStorage.getItem(user.uid));
       }
      }

  //update user profile
  function updateUser()
  {
   var user = firebase.auth().currentUser;
   user.updateProfile({
     displayName:document.getElementById("id_user_name").value
    //  photoURL: "https://example.com/jane-q-user/profile.jpg"
   }).then(function() {
     // Update successful.
       Materialize.toast('Profile updated' , 2000, 'rounded');
   }, function(error) {
     // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        Materialize.toast('Update Profile Failed:'+ errorMessage, 4000, 'rounded');
   });

  }

  //Sign Up new User
  function signOut()
  {
  firebase.auth().signOut().then(function() {
     // Sign-out successful.
     // Redirecting to other page.
      Materialize.toast('Signing Off:', 2000, 'rounded');
      window.location = "./index.html";
       }).catch(function(error) {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    Materialize.toast('Sign Up Failed:'+ errorMessage, 4000, 'rounded');
  });
  };
