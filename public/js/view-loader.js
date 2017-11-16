// Export selectors engine
var $$ = Dom7;

$$.get('../templates/login-screen.template.html', function(data){
  $$('.login-screen').html(data);
});

// $$.get('../templates/editor.template.html', function(data){
//   $$('#editor').html(data);
// });

$$.get('../templates/settings.template.html', function(data){
  $$('#settings').html(data);
});

$$.get('../templates/json-output.template.html', function(data){
  $$('#json-output').html(data);
});
