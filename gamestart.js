
module.exports = function (images, options, GenerateRand) {
    var numCards = images.length; 
    var numFlips = options[0].flips; ////////////////////
    var maxNumCards = options[1].max; //Determines the max number of card pairings that are set up
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

    return {
    cardInfo: ar,
    flips: numFlips,
    maxCards: maxNumCards
    };
};