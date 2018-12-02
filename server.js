//Vars
var express = require('express');
var exphb = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

//GenerateRand creates an array of random numbers of size amount from 0 to max-1, with no repeated numbers. 
//Useful for getting random photos from MongoDB and arranging the photos randomly
function GenerateRand(amount, max){
  var first = Math.floor(Math.random()*max);
  var next;
  var array = [first];
  while(array.length < amount){
    next = Math.floor(Math.random()*max); //Generates a random number from 0 to 1-max
    if(array.indexOf(next) != -1){ //if the number is present, generate another
      continue;
    }
    else{
      array.push(next);
    }
  }
  return array;
}



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
  var ar = [];  
  var i = 0;
  var photoUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
  var random = GenerateRand(4,4); //four possible choices and a length of four

  while(parseInt(i) < 4){ //create an array with randomly arranged photos
    ar.push({
      url: photoUrls[random[i]],
      id: "card" + i,
      cardback: "Cardback.jpg"
    });
    i = i + 1;  
  }

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