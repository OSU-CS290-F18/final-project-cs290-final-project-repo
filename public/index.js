
var numFlips = 2;
var numCards = 4;
var matchCounter = 0; //How many card pairs have been matched
var flippedArray = []; //the cards during each reset period that were flipped so far
var cardCounter  = 0;  //counts the number of cards turned before a reset
var running = 0; //running makes sure the FlipCard function is only run once the previous one finishes(otherwise it can result in issues with the enlarge/darkening)

var congrats = document.getElementById('congratulations-modal');//grabs congratulation pop up html contnent

//Copied sleep function from flaviocopes.com
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//for await to work, the funciton must be marked as asyncronous
async function checkPair() {
    var check = flippedArray[0].getAttribute('data_post_id');
    for(var i = 0; i < numFlips; i++) {
        if (check != flippedArray[i].getAttribute('data_post_id')) {//check if any ids don't match

            //Card enlarge visual effects
            for(var j = 0; j < numFlips; j++){
                flippedArray[j].classList.toggle('enlarge1');
            }
            //await causes the funciton to wait for the sleep
            await sleep(300).then(() => {
                for(var j = 0; j < numFlips; j++){
                    flippedArray[j].classList.toggle('enlarge1');
                    flippedArray[j].classList.toggle('enlarge2');
                }
            });
            await sleep(600).then(() => {
                for(var j = 0; j < numFlips; j++){
                    flippedArray[j].classList.toggle('enlarge2');
                }
            });
            //end visual effects
            for (var j = 0; j < numFlips; j++) {//flip cards back over if not
                flippedArray[0].classList.toggle('flipped');
                flippedArray[0].children[0].children[0].src = "Cardback.jpg";
                flippedArray.shift();
            }
            return;
        }
    }
    //Darken flipped cards
    for(var i = 0; i < numFlips; i++){
        flippedArray[i].classList.toggle('darkened'); 
    }
    matchCounter++;
    for (var i = 0; i < numFlips; i++) {
        flippedArray.shift();
    }

    if (matchCounter >= numCards) {//check if all cards have been flipped and displays congratulations modal
        congrats.classList.toggle('hidden');
    }
}

async function FlipCard(event){
    if(parseInt(running) === 0){ 
        running = 1;
        el = event.target;
        //make sure the element isn't the card container
        if(el.classList.contains("cardContainer") === true){
            running = 0;
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
            running = 0;
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
    
    if (cardCounter%numFlips === 0) {//if they have flipped the max number of cards in a sequence, check those cards
        await sleep(700).then(() => {
            checkPair();
        });
    }  
    running = 0;
}
window.addEventListener('DOMContentLoaded', function () {
    var posts = document.getElementById("cardContainer");
    if(posts){
        posts.addEventListener('click', FlipCard);
    }

    var closeCongratsModal = document.getElementById('congratulations-modal-close');//closes congratulations modal upon clicking exit
    closeCongratsModal.addEventListener('click', function(event) {
        congrats.classList.toggle('hidden');
    });

});