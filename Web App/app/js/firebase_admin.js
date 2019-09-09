
    // Initialize Firebase
  firebase.initializeApp(AppConstants.CONFIG);
  var user = firebase.auth().currentUser;

  //Update Profile
  getUser();

   //-------------------------------------AUTHENTICATION---------------------------

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

   //-------------------------------------PROFILE MANAGMENT---------------------------

   document.getElementById('files').addEventListener('change', handleFileSelect, false);

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
                              // Store Profile Image
                              localStorage.setItem(user.uid, e.target.result);

                             Materialize.toast('Profile Pic updated' , 2000, 'rounded');
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

   //get current signed in user credentials
   function getUser(){
     firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.

                  //  Materialize.toast('Name:'+user.displayName + 'email:'+user.email, 2000, 'rounded');
                   $("#id_user_name").val(user.displayName);
                   $("#user_name").text(user.displayName);
                   $("#user_mail").text(user.email);
                   // Retrieve image path from web storage
                   $("#profile_pic").attr("src",  localStorage.getItem(user.uid));

            } else {
              // No user is signed in.
              Materialize.toast('User is Null:', 2000, 'rounded');
              window.location = "./index.html";
            }
          });
       }

   //update user profile
   function updateUser()
   {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName:document.getElementById("id_user_name").value
    }).then(function() {
      // Update successful.
        Materialize.toast('Profile updated' , 2000, 'rounded');
        getUser();
    }, function(error) {
      // An error happened.
         var errorCode = error.code;
         var errorMessage = error.message;
         Materialize.toast('Update Profile Failed:'+ errorMessage, 4000, 'rounded');
    });

   }
