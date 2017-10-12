const express = require('express');
const path = require('path');


var app = express();
const publicPath = path.join(__dirname,'../public');


app.use(express.static(publicPath));


app.listen(4000, ()=>{
  console.log('Server running on port 4000');
})
