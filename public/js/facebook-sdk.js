let username;
let userID;
let userPic;


window.fbAsyncInit = function() {
    FB.init({
      appId      : '136186643689266',
      xfbml      : true,
      version    : 'v2.10'
    });

    FB.getLoginStatus(function(response) {
      console.log(response);
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
     FB.api('/me?fields=id,name,picture', function(response) {
       console.log(response.name);
       username = response.name;
       userID = response.id;
       userPic = response.picture.data.url;
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
