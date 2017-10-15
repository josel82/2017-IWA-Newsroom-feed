// Export selectors engine
var $$ = Dom7;

$$.get('../login-screen.html', function(data){
  $$('.login-screen').html(data);
});

// $$.get('../news.html', function(data){
//   $$('#news').html(data);
// });

$$.get('../editor.html', function(data){
  $$('#editor').html(data);
});

$$.get('../settings.html', function(data){
  $$('#settings').html(data);
});

$$.get('../json-output.html', function(data){
  $$('#json-output').html(data);
});
