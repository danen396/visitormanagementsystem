

  // Initialize Firebase
  firebase.initializeApp(AppConstants.CONFIG);
  var user = firebase.auth().currentUser;

   //-------------------------------------AUTHENTICATION---------------------------
  function signIn() {

        $("#progress").show();

        //Authenticate User
        firebase.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(function(user) {
          //Success! user signed in
          // Redirecting to other page.
          window.location = "./home.html";
          $("#progress").hide();
          return false;
         })
        .catch(function(error)
         {
         $("#progress").hide();
         // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // Decrementing by one.
        attempt--;
        if (errorCode === 'auth/wrong-password') {
            Materialize.toast('Login Failed: Wrong password, You have left ' + attempt + ' attempt', 5000, 'rounded');
          } else {
            Materialize.toast('Login Failed,'+ errorMessage +' You have left ' + attempt + ' attempt', 5000, 'rounded');
          }
         // Disabling fields after 3 attempts.
         if (attempt == 0) {
                  email.disabled = true;
                  password.disabled = true;
                  document.getElementById("submit").disabled = true;
                  return false;
                }
          console.log(error);
        });
  };

  //Sign Up new User
   function signUp()
   {
      firebase.auth().createUserWithEmailAndPassword(emailsignup.value, passwordsignup.value)
      .then(function(user) {
        //Success! user signed in
        // Redirecting to other page.
        window.location = "./home.html";
       })
       .catch(function(error) {
        // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       Materialize.toast('Sign Up Failed:'+ errorMessage, 5000, 'rounded');
      });
   };

    //Reset Password
   function resetPassword()
   {
     if(emailresetpass.value !=null && emailresetpass.value != "")
     {
       $("#progress").show();
       var auth = firebase.auth();
       auth.sendPasswordResetEmail(emailresetpass.value).then(function() {
         // Email sent.
          Materialize.toast('Instruction to reset password has been send to your mail id', 3000, 'rounded');
           $("#progress").hide();
           }, function(error) {
           $("#progress").hide();
          // An error happened.
       var errorCode = error.code;
       var errorMessage = error.message;
       Materialize.toast('Reset Password Failed:'+ errorMessage, 5000, 'rounded');
       });
     }else {
       Materialize.toast('Invalid Email Address', 3000, 'rounded');
        return;
     }
   };
