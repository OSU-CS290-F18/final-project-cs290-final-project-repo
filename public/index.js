var numFlips = parseInt(document.getElementById('options-flips').placeholder);
var numCards = Math.floor(document.querySelectorAll('.cardPhoto').length/2);
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
    }
    running = 0;
}

function PostCard(event){
    var cardURL = document.getElementById('url-text-input');
    var cardDesc = document.getElementById('card-description-input');

    //Make sure fields are filled
    if(!cardURL.value || !cardDesc.value){
        alert("New cards must have an image and description");
        return;
    }
    //Create the request to post a card
    var req = new XMLHttpRequest();
    req.open('POST', '/newCard');
    var body = JSON.stringify({
        url: cardURL.value,
        description: cardDesc.value
    });

    req.setRequestHeader('Content-Type', 'application/json');
    //Listen for response from the server
    req.addEventListener('load', function(event){
        if(event.target.status != '200'){
            alert("There was an issue adding the post");
        }
    });
    req.send(body);
    //Close the modal
    document.getElementById('add-card-modal').classList.toggle('hidden');
}

function reset(event) {
    var flipInput = document.getElementById('options-flips');
    var maxCardInput = document.getElementById('options-max-cards');
    if (!flipInput.value) {
        flipInput.value = numFlips;

    }
    if (!maxCardInput.value) {
        maxCardInput.value = parseInt(numCards);
    } 
    console.log(maxCardInput.value);
    console.log(flipInput.value);
    var req = new XMLHttpRequest();
    req.open('POST', '/reset');
    var body = JSON.stringify({
        flips: flipInput.value,
        max: maxCardInput.value
    });

    req.setRequestHeader('Content-Type', 'application/json');
    //Listen for response from the server
    req.addEventListener('load', function(event){
        if(event.target.status != '200'){
            alert("There was an issue resetting");
        }
    });
    /*callGame();*/
    req.send(body);
    
}

function callGame() {
    console.log("asdf");
    var req = new XMLHttpRequest();
    req.open('GET', '/game', true);

    req.onload = function () {
        console.log("loaded");
    }
    req.setRequestHeader('Content-Type', 'application/json');
    //Listen for response from the server
    req.addEventListener('load', function(event){
        if(event.target.status != '200'){
            alert("There was an issue resetting");
        }
    });
    req.send(null);
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

    var addCard = document.getElementById('add-card-modal');
    var cardButton = document.getElementById('add-card-button');
    var closeCardModal = document.getElementById('add-card-modal-close');
    var acceptCardModal = document.getElementById('add-card-modal-accept');
    if(cardButton){
        cardButton.addEventListener('click',function(event){
            addCard.classList.toggle('hidden');
        })
    }
    if(addCard){
        closeCardModal.addEventListener('click', function(event){
            addCard.classList.toggle('hidden');
        })
        acceptCardModal.addEventListener('click', PostCard);
    }

    var resetButton = document.getElementById('sidebar-reset');

    if(resetButton) {
        resetButton.addEventListener('click', reset);
    }

});