

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
    wellcomeUser();
    getAllNews();
  }else{
    myApp.loginScreen('.login-screen');
  }
}

function wellcomeUser(){
    let popupHTML = `
      <div class="popup popup-about" id="wellcomeMsg">
        <div class="content-block">
          <h1>Wellcome ${username}</h1>
        </div>
      </div>
    `;
    myApp.popup(popupHTML);
    setTimeout(function(){
      myApp.closeModal('#wellcomeMsg');
    },1500);
}


function printError(selector){
  $$(selector).html(
    `<div class="content-block">
       <p>Unable to show news...</p>
     </div>`
    );
}

//**************************view1 (#news)***************************

function renderArticles(selector, articles){
  console.log(`rendering ${selector}`);
  $$(`#${selector}`).html('');
  $$.each(articles, function(i){
    let date = new Date(articles[i].publishedAt);
    $$(`#${selector}`).append(`<li>
        <div class="item-content">
            <div class="item-media">
                <img id="art-img" src="${articles[i].urlToImage}">
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

function onRefreshPage(){
  getAllNews();
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

function getAllNews(){

  requestFeed(businessFeedURI, function(data){
        window.businessNews = data;
        renderArticles('business-articles', data);
  });

  requestFeed(financialFeedURI, function(data){
        window.financialNews = data;
        renderArticles('financial-articles', data);
  });

  requestFeed(sportsFeedURI, function(data){
        window.sportNews = data;
        renderArticles('sport-articles', data);
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
  myApp.showIndicator();
  FB.logout(function(response) {
    loggedIn = false;
    myApp.hideIndicator();
    checkLoginStatus();
    $$('.login-screen').on('loginscreen:close',function(){
      myApp.showTab('#news', false);
    });
  });
}
