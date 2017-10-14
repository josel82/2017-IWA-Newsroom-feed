
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
    $$('.login-screen').on('loginscreen:close',function(){
      myApp.showTab('#news', false);
    });
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
  },1500);
}

function onRefreshPage(){
  view1.router.refreshPage();
}

function requestFeed(feedURI, callback){
  $$.getJSON(feedURI,
          function(data){
            callback(data.articles);
          },
          function(error){
            console.log('Unable to get news', error);
            printError('.articles');
          });
}

function printError(selector){
  $$(selector).html(
    `<div class="content-block">
       <p>Unable to show news...</p>
     </div>`
    );
}

function renderArticles(selector, articles){
  $$.each(articles, function(i){
    let date = new Date(articles[i].publishedAt);
    $$(`#${selector}`).append(`<li>
        <div class="item-content">
            <div class="item-media">
                <img style="max-width: 150px; height: auto" src="${articles[i].urlToImage}">
            </div>
            <div class="item-inner">
                <div class="item-title-row">
                    <div class="item-title">${articles[i].title}</div>
                    <div class="item-after"></div>
                </div>
                <div class="item-subtitle">
                  ${date.toLocaleTimeString('en-GB', {formatMatcher: 'best fit',
                                                      weekday: 'short',
                                                      hour: '2-digit',
                                                      minute: '2-digit'})}
                </div>
            </div>
        </div>
    </li>`)
  });
}
