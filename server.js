//Vars
var express = require('express');
var exphb = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
//Sever Setup
app.engine('handlebars', exphb({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

//Serving up those static files
app.use('/public', express.static('public'));

app.get('/', function(req, res){
  res.statuscode = 200;
  res.render('start');
});

app.get('/game', function(req, res) {
  res.statusCode = 200;
    res.render('game');
});

app.get('*', function (req, res) {
  res.statusCode = 404;
  res.render('404');
});



app.listen(port, function () {
  console.log("== Server is listening on port", port);
});