var username;
var userID;

window.fbAsyncInit = function() {
    FB.init({
      appId      : '136186643689266',
      xfbml      : true,
      version    : 'v2.10'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 function statusChangeCallback(res){
   if(res.status === 'connected'){
     window.loggedIn = true;
     FB.api('/me', function(response) {
       window.username = response.name;
       window.userID = response.id;
       checkLoginStatus();
     });
   } else {
     loggedIn = false;
     checkLoginStatus();
   }
 }

 function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
