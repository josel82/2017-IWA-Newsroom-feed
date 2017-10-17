

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
      window.businessNews = {'business': data};
      myApp.template7Data.business = data;
      routeToBusiness();
    },
    function(err){
      console.log('Unable to get news', err);
    }
  );

  requestFeed(financialFeedURI).then(
    function(data){
      window.financialNews = {'financial': data};
      myApp.template7Data.financial = data;
    },
    function(err){
      console.log('Unable to get news', err);
    }
  );

  requestFeed(sportsFeedURI).then(
    function(data){
      window.sportNews = {'sports': data};
      myApp.template7Data.sports = data;
    },
    function(err){
      console.log('Unable to get news', err);
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

//**************************view2 (#editor)***************************

function onSubmit(){
  let formData = myApp.formToData('#editorForm');
  window.newStories.push(formData);
  myApp.showIndicator();
  storeInDataBase(formData)
    .then(
      function(res){
        myApp.hideIndicator();
        myApp.alert('New story has been submited!', function(){
          $$('#editorForm')[0].reset();
        });
      },
      function(err){
        myApp.hideIndicator();
        myApp.alert('Unable to submit story');
        console.log(err);
      });
}

function storeInDataBase(data){
  return new Promise(function(resolve, reject){
    let response = {status: 200, data: 'success'};
    setTimeout(function(){
      if(response.status === 200){
        resolve(response);
      }else{
        reject(response)
      }
    },1000);
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
