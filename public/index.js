
var numFlips = 2;
var numCards = 4;
var matchCounter = 0; //How many card pairs have been matched
var flippedArray = []; //the cards during each reset period that were flipped so far
var cardCounter  = 0;  //counts the number of cards turned before a reset

//Copied sleep function from flaviocopes.com
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function checkPair() {
    var check = flippedArray[0].getAttribute('data_post_id');
    for(var i = 0; i < numFlips; i++) {
        if (check != flippedArray[i].getAttribute('data_post_id')) {//check if any ids don't match
            for (var j = 0; j < numFlips; j++) {//flip cards back over if not
                flippedArray[j].classList.toggle('flipped');
                flippedArray[j].children[0].children[0].src = "Cardback.jpg";
            }
            flippedArray = [];
            return;
        }
    }
    matchCounter++;
    flippedArray = [];
}

function FlipCard(event){
    el = event.target;
    //make sure the element isn't the card container
    if(el.classList.contains("cardContainer") === true){
        return;
    }
    //Make sure the element is the card, not the image
    if(el.classList.contains("card") === false){
        while(el.classList.contains("card") === false){
            el = el.parentElement;
        };
    }
    //make sure card is not flipped
    if (el.classList.contains("flipped") === true) {
        return;
    }

    image = el.children[0].children[0];

    //If face up, flip card face down
    if(image.src === "http://localhost:3000/" + el.getAttribute('data_url')){
        image.src = "Cardback.jpg";
    }
    //If face down, flip card face up
    else{
        image.src = el.getAttribute('data_url');
    }
    el.classList.toggle("flipped");
    cardCounter++;
    flippedArray.push(el);
    
    if (cardCounter%numFlips === 0) {
        sleep(700).then(() => {
            checkPair();
        });
    }   
    if (matchCounter >= numCards) {
        //display congratulations play again modal
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var posts = document.getElementById("cardContainer");
    if(posts){
        posts.addEventListener('click', FlipCard);
    }
});