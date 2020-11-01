document.addEventListener("DOMContentLoaded", () => {

    //card options
    const cardArray = [
        {
            name: "cupcake",
            img: "images/Cupcake pig small.png"
        },
        {
            name: "cupcake",
            img: "images/Cupcake pig small.png"
        },
        {
            name: "harry piggie",
            img: "images/Harry Piggie small.png"
        },
        {
            name: "harry piggie",
            img: "images/Harry Piggie small.png"
        },
        {
            name: "fuzzlock holmes",
            img: "images/Fuzzlock Holmes small.png"
        },
        {
            name: "fuzzlock holmes",
            img: "images/Fuzzlock Holmes small.png"
        },
        {
            name: "pigglypuff",
            img: "images/Pigglypuff small.png"
        },
        {
            name: "pigglypuff",
            img: "images/Pigglypuff small.png"
        },
        {
            name: "sushi",
            img: "images/Sushi pig small.png"
        },
        {
            name: "sushi",
            img: "images/Sushi pig small.png"
        },
        {
            name: "link",
            img: "images/Guinea Link small.png"
        },
        {
            name: "link",
            img: "images/Guinea Link small.png"
        }
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".grid");
    const playAgain = document.querySelector(".playAgain");
    const counter = document.querySelector(".counter");
    const highscore = document.querySelector(".highscore");
    if(localStorage.getItem("highscore")==null){
        localStorage.setItem("highscore", 0);
    }
    highscore.innerHTML = "Highscore: " + localStorage.getItem("highscore");
    
    const display = document.querySelector(".display");
    let score = document.createElement("p");
    counter.appendChild(score);
    
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    let clickCounter = 0;

    //create your board
    function createBoard(){
        for(let i = 0; i<cardArray.length; i++){
            var card = document.createElement("img");
            card.setAttribute("src", "images/icon.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipcard);
            grid.appendChild(card);
        }
        
    }

    //check for matches
    function checkForMatch(){
        var cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0]===cardsChosen[1]){
            displyWonCards(cards[optionOneId].getAttribute("src"));
            cards[optionOneId].setAttribute("src", "images/blank.png");
            cards[optionTwoId].setAttribute("src", "images/blank.png");
            cardsWon.push(cardsChosen);
        }
        else{
            cards[optionOneId].setAttribute("src", "images/icon.png");
            cards[optionTwoId].setAttribute("src", "images/icon.png");
        }
        cardsChosen = [];
        cardsChosenId = [];

        if(cardsWon.length === cardArray.length/2){
            grid.innerHTML="";
            var card = document.createElement("img");
            card.setAttribute("src", "images/Happy pig.jpg");
            card.classList.add("gameWon");
            grid.appendChild(card);
            
            if(localStorage.getItem("highscore")>clickCounter || localStorage.getItem("highscore")==0){
                localStorage.setItem("highscore", clickCounter);
                highscore.innerHTML = "Highscore: " + localStorage.getItem("highscore");
            }

            let btn = document.createElement("button");
            btn.innerHTML = "Play again?";
            playAgain.appendChild(btn);
            btn.addEventListener("click", function(e){
                location.reload();
            });
        }
    }

    //flip your card
    function flipcard(){
        clickCounter++;
        score.innerHTML = "Score: "+clickCounter;
        var cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 1000);
        }
    }

    function displyWonCards(card){
        let displayCard = document.createElement("img");
        displayCard.setAttribute("src", card);
        display.appendChild(displayCard);

    }

    createBoard();

})