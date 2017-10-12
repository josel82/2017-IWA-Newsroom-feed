//*********************************************************
//***************** App Initialization ********************
//*********************************************************
'use strict';
var loggedIn = false;
// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#news', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view2 = myApp.addView('#editor');
var view3 = myApp.addView('#settings');
var view4 = myApp.addView('#view-4');


//*********************************************************
//****************** App Functionality ********************
//*********************************************************

myApp.router.load()

function fakeLogin(){
  setTimeout(function(){
    loggedIn = true;
    checkLoginStatus();
    wellcomeUser();
  },1500);
}

function fakeLogout(){
  setTimeout(function(){
    loggedIn = false;
    checkLoginStatus();
    myApp.router.back({url:'index.html', force:true})
  },1000);
}

function checkLoginStatus(){
  if(loggedIn){
    myApp.closeModal('.login-screen');
  }else{
    myApp.loginScreen('.login-screen');
  }
}

function wellcomeUser(){
  myApp.popup('#wellcomeMsg');
  setTimeout(function(){
    myApp.closeModal('#wellcomeMsg');
  },1000);
}
