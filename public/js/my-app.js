//*********************************************************
//***************** App Initialization ********************
//*********************************************************
'use strict';
var loggedIn = false;
// Initialize app
var myApp = new Framework7({
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
    template7Data: {
      'business':{},
      'financial':{},
      'sports':{},
      'top10':{},
      'currentAuthors':{},
      'editor':{}
    }
});


// Add views
var view1 = myApp.addView('#news', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view2 = myApp.addView('#editor',{
  dynamicNavbar: true
});
var view3 = myApp.addView('#settings');
var view4 = myApp.addView('#json-output');


//*********************************************************
//****************** App Functionality ********************
//*********************************************************

Template7.registerHelper('date', function(timestamp){
  let date = new Date(timestamp);
  return date.toLocaleTimeString('en-GB', {formatMatcher: 'best fit',
                                      weekday: 'short',
                                      hour: '2-digit',
                                      minute: '2-digit'});

});

//News storage
var newStories = [];

//News Feed API URLs
const businessFeedURI = 'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';
const sportsFeedURI = 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';
const financialFeedURI = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=326561aa48064fd6b3ef0dc19a133043';
const top10FeedURI = 'http://52.48.79.163/db.php';

checkLoginStatus();


$$('#editor').on('tab:show', function () {
    myApp.template7Data.editor = {
      username : username,
      userID : userID
    };
    routeToEditor();
});

$$('#json-output').on('tab:show', function(){
  let objOutput = {
    businessNews: myApp.template7Data.business.articles,
    financialNews: myApp.template7Data.financial.articles,
    sportNews: myApp.template7Data.sports.articles,
    top10Stories: {
        stories: myApp.template7Data.top10.story,
        currentAuthors: myApp.template7Data.currentAuthors.author
    }
  };
  $$('#json-container').html(JSON.stringify(objOutput, undefined, 2));
});
