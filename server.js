//Vars
var express = require('express');
var exphb = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var gamestart = require('./gamestart');

//Mongo variables
var mongoUser = process.env.MUSER;
var mongoPassword = process.env.MPASSWORD;
var mongoPort = process.env.MPORT || 27017;
var mongoHost = process.env.MHOST || "classmongo.engr.oregonstate.edu";
var mongoDBName = process.env.MDBNAME || mongoUser;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;
var images;
var options;

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
app.use(bodyParser.json());

//Default handler
app.get('/', function(req, res){
  res.statuscode = 200;
  res.render('start');
});

<<<<<<< HEAD

//////////////////////////////
=======
//Returns the images array as a string, use JSON.parse to transform into JSON
app.get('/images', function(req,res){
  res.statusCode = 200;
  content = images;
  res.set("Content-Type", "application/json");
  res.send(content);
})

//Deletion handler
app.delete('/deleteCard', async function(req, res){
  if(req.body && req.body.id){
    var imageCollection = mongoDB.collection('images');

    //Delete the image from mongo
    await imageCollection.deleteOne({
      id: req.body.id
    });

    //Update the images array
    var imageCursor = imageCollection.find({});
    imageCursor.toArray(function(err, imageDocs){
      if(err){
        res.status(500).send('There was an error deleting the image');
        throw err;
      }
      else{
        images = imageDocs;
        res.status(200).send('Image deleted');
     }
    });
  }
  else{
    res.status(400).send('missing required fields');
  }
});


>>>>>>> master
//Game handler
app.get('/game', function(req, res) {
  res.statusCode = 200;
    var numCards = images.length; 
    var numFlips = options[0].flips; ////////////////////
    var maxNumCards = options[1].max; //Determines the max number of card pairings that are set up
    console.log(maxNumCards);
    console.log(numFlips);
    console.log("break");
    var ar = [];  
    var i = 0;
    var random = GenerateRand(numCards * numFlips, numCards*numFlips);
    var randRemove;

    if (maxNumCards >= numCards) {
      randRemove = [];
    }   
    else {
      randRemove = GenerateRand(numCards - maxNumCards, numCards);
    }

 //takes in 8 cards and returns 8 rand numbers.  Use integer division by the number of matches

    for (var j = 0; j < randRemove.length; j++) { //Filters out the numbers that were randomly selected in randRemove
      random = random.filter(function(value, index, arr) {
        return Math.floor(value/numFlips) != randRemove[j];
      });
    }


    while(parseInt(i) < random.length){ //create an array with randomly arranged photos
      ar.push({
        url: images[Math.floor(random[i]/numFlips)].url,
        id: "card" + Math.floor(random[i]/numFlips),
        cardback: "Cardback.jpg"
    });
      i++;  
    }

    res.render('game', {
    cardInfo: ar,
    flips: numFlips,
    maxCards: maxNumCards
    });
  
});
////////////////////////////////

app.post('/reset', function(req, res){
  if (req.body && req.body.flips && req.body.max) {
    
    var optionsCollection = mongoDB.collection('options');

    optionsCollection.updateOne({id: "flips"}, { $set: {flips: req.body.flips}});
    optionsCollection.updateOne({id: "max"}, { $set: {max: req.body.max}});
    
    var optionsCursor = optionsCollection.find({});
      optionsCursor.toArray(function(err, optionsDocs){
      if(err){
        throw err;
      }
      else{
        options = optionsDocs;
     }
    });

    res.status(200).send('Options were added');
  }
  else{
    res.status(400).send('missing required fields');
   
  }
});

app.post('/newCard', async function(req, res){
  //make sure there are values for the things we want: url and description
  if(req.body && req.body.url && req.body.description){
    var imageCollection = mongoDB.collection('images');

    //Send the new image to mongo
    await imageCollection.insertOne({
      url: req.body.url,
      description: req.body.description,
      default: 'false',
      id: 'photo'+ (images.length + 1)
    });

    //Update the images array
    var imageCursor = imageCollection.find({});
    imageCursor.toArray(function(err, imageDocs){
      if(err){
        throw err;
      }
      else{
        images = imageDocs;
     }
    });

    res.status(200).send('Image added to database');
  }
  else{
    res.status(400).send('missing required fields');
  }
});

//404 handler
app.get('*', function (req, res) {
  res.statusCode = 404;
  res.render('404');
});

//Make sure the mongo user and password are defined
if(!mongoUser || !mongoPassword){
  throw "MUSER and MPASSWORD environment variables must be defined";
}

//Make sure we connect to mongo before running the server
mongoClient.connect(mongoURL, function(err, client){
  if(err){
    throw err;
  }
  //Get the images from mongo
  mongoDB = client.db(mongoDBName);
  var imageCollection = mongoDB.collection('images');
  var imageCursor = imageCollection.find({});
  imageCursor.toArray(function(err, imageDocs){
            if(err){
              throw err;
            }
            else{
              images = imageDocs;
            }
          }); 
          //////////////////////////
  var optionsCollection = mongoDB.collection('options');
  var optionsCursor = optionsCollection.find({});
  optionsCursor.toArray(function(err, optionsDocs){
            if(err){
              throw err;
            }
            else{
              options = optionsDocs;
            }
          });
          ///////////////////////////
  //start the server
  app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });
});
