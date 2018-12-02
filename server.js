//Vars
var express = require('express');
var exphb = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
//Sever Setup
app.engine('handlebars', exphb({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

//Serving up those static files
app.use(express.static('public'));

//Default handler
app.get('/', function(req, res){
  res.statuscode = 200;
  res.render('start');
});

//Game handler
app.get('/game', function(req, res) {
  res.statusCode = 200;

  /*Card Generation Section*/
  var ar = [{   //ar is an array of info for the cards, hardcoded for now
    url: "/house.jpg",
    id: "card1"   //id could be used to track if two of the same card are flipped
  },
  {
    url: "/house.jpg",
    id: "card2"
  }];

  res.render('game', {
    cardInfo: ar
  });
});

//404 handler
app.get('*', function (req, res) {
  res.statusCode = 404;
  res.render('404');
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});