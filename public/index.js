
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
}

window.addEventListener('DOMContentLoaded', function () {
    var posts = document.getElementById("cardContainer");
    if(posts){
        posts.addEventListener('click', FlipCard);
    }
});