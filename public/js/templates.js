
function errorMsgTemplate(error){
  let template = `<div class="content-block">
                   <p>${error}</p>
                 </div>`

  return template;
}


//******************************Welcome Message popup******************************

function welcomeMsgTemplate(username){
  let template = `<div class="popup popup-about" id="wellcome-popup">
                    <div class="content-block" id="wellcome-msg">
                      <h1>Welcome</h1>
                      <h1>${username}</h1>
                    </div>
                  </div>`;
  return template;
}
