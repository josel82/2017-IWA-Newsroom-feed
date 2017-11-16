

function fakeLogin(){
  setTimeout(function(){
    loggedIn = true;
    let formData = myApp.formToData('#loginForm');
    window.username = formData.username;
    checkLoginStatus();
  },1500);
}

function fakeLogout(){
  setTimeout(function(){
    loggedIn = false;
    checkLoginStatus();
    $$('.login-screen').on('loginscreen:close',function(){
      myApp.showTab('#news', false);
    });
  },1000);
}

function checkLoginStatus(){
  if(loggedIn){
    myApp.closeModal('.login-screen');
    welcomeUser();
    getAllNews();
  }else{
    myApp.loginScreen('.login-screen');
  }
}

function welcomeUser(){
    myApp.popup(welcomeMsgTemplate(username));
    setTimeout(function(){
      myApp.closeModal('#wellcome-popup');
    },1500);
}


function printError(selector, error){
  $$(selector).html(errorMsgTemplate(error));
}

//**************************view1 (#news)***************************

function onRefreshPage(){
  getAllNews();
}

function requestFeed(feedURI){
  return new Promise(function(resolve, reject){
    $$.getJSON(feedURI,
            function(data){
              resolve(data);
            },
            function(err){
              reject(err);
            });
  });
}

function getAllNews(){
  requestFeed(businessFeedURI).then(
    function(data){
      myApp.template7Data.business = data;
      routeToBusiness();
    },
    function(err){
      console.log('Unable to get news', err);
    }
  );

  requestFeed(financialFeedURI).then(
    function(data){
      myApp.template7Data.financial = data;
    },
    function(err){
      console.log('Unable to get news', err);
    }
  );

  requestFeed(sportsFeedURI).then(
    function(data){
      myApp.template7Data.sports = data;
    },
    function(err){
      console.log('Unable to get news', err);
    }
  );

  $$.get(top10FeedURI, {type: 'top10stories'}, function(data){
      let top10 = JSON.parse(data).news;
      myApp.template7Data.top10 = top10;
    },
    function(error){
      console.log('Unable to get top 10 stories', error);
    }
  );
  $$.get(top10FeedURI, {type: 'currentauthors'}, function(data){
      let authors = JSON.parse(data).authors;
      myApp.template7Data.currentAuthors = authors;
    },
    function(error){
      console.log('Unable to get authors', error);
    }
  );
}

function routeToBusiness(){
  view1.router.load({
      url: 'templates/business.template.html',
      context: myApp.template7Data.business
    });
}
function routeToFinancial(){
  view1.router.load({
      url: 'templates/financial.template.html',
      context: myApp.template7Data.financial
    });
}
function routeToSports(){
  view1.router.load({
      url: 'templates/sports.template.html',
      context: myApp.template7Data.sports
    });
}
function routeToEditor(){
  view2.router.load({
      url: 'templates/editor.template.html',
      context: myApp.template7Data.editor
    });
}

function routeToTop10(){
  view2.router.load({
      url: 'templates/top10.template.html',
      context: myApp.template7Data.top10
    });
}


//**************************view2 (#editor)***************************

function onSubmit(){
  let formData = myApp.formToData('#editorForm');
  let url = `${top10FeedURI}?type=newstory&data=${formData.text}&id=${formData.userID}`;
  console.log(url);
  let encUrl = encodeURI(url);
  console.log(encUrl);
  // window.newStories.push(formData);
  if(formData.category === "Category"){
    myApp.alert('Please select a category.');
  }else if(formData.text === ""){
    myApp.alert('Please write a story.');
  }else{
    myApp.showIndicator();
    $$.get(encUrl, function(res){
              console.log(res);
              myApp.hideIndicator();
              myApp.alert('New story has been submited!', function(){
                $$('#editorForm')[0].reset();
              });
            },
            function(err){
              myApp.hideIndicator();
              myApp.alert('Unable to submit story');
              console.log(err);
            }
    );
  }
}

function storeInDataBase(data){
  return new Promise(function(resolve, reject){

  });
}

//**************************view3 (#settings)**************************

function onLogout(){
  myApp.showPreloader('Loggin out');
  FB.logout(function(response) {
    loggedIn = false;
    myApp.hidePreloader();
    checkLoginStatus();
    $$('.login-screen').on('loginscreen:close',function(){
      myApp.showTab('#news', false);
    });
  });
}
