//*********************************************************
//***************** App Initialization ********************
//*********************************************************
'use strict';
var loggedIn = true;
// Initialize app
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

//News storage
var businessNews;
var financialNews;
var sportNews;
var homeNews = [];

//News Feed API URLs
const businessFeedURI = 'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';
const sportsFeedURI = 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';
const financialFeedURI = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';


//This function will run when the app starts
(function(){
  checkLoginStatus();
  if (businessNews === undefined) {
    requestFeed(businessFeedURI, function(data){
      window.businessNews = data;
      renderArticles('business-articles', data);
    });
  }
})();

//EventListeners
$$('#financial').on('tab:show', function(){
  if (financialNews === undefined) {
    requestFeed(financialFeedURI, function(data){
      window.financialNews = data;
      renderArticles('financial-articles', data);
    });
  }
});

$$('#sports').on('tab:show', function(){
  if (sportNews === undefined) {
    requestFeed(sportsFeedURI, function(data){
      window.sportNews = data;
      renderArticles('sport-articles', data);
    });
  }
});
// $$('#news').on('tab:show', function(){
//
// });
//
// $$('#business').on('tab:show', function(){
//
// });

//Parses Form data into JSON format
$$('.submit-data').on('click', function(){
  let formData = myApp.formToData('#editorForm');
  window.homeNews.push(formData);
  console.log(JSON.stringify(homeNews, undefined, 2));
});
