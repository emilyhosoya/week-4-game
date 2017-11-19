// load page
$(document).ready(function() {

    // score card
    var wins = 0;
    var losses = 0;
    console.log(`You have ${wins} wins and ${losses} losses. Let's get started!`);
    $("#winCounter").text(wins);
    $("#lossesCounter").text(losses);

    // random number generator
    function getRandomIntInclusive(min, max) {
        var min = Math.ceil(min);
        var max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }


    // start game function
    function startGame() {

        $("#btn-area").empty();


        // score counter = 0
        var scoreCounter = 0;
        $("#scoreCounter").text(scoreCounter);
        $("#scoreCounter").attr("value", scoreCounter);

        // targetNumber between 19 and 120
        var targetNumber = getRandomIntInclusive(19, 120);
        console.log(`The target number is ${targetNumber}.`);
        $("#targetNumber").text(targetNumber);
        $("#targetNumber").attr("value", targetNumber);

        // win/lose conditional
        function checkForWin() {
            var score = parseInt($("#scoreCounter").attr("value"));
            var target = parseInt($("#targetNumber").attr("value"));
            // if scoreCounter = targetNumber, player wins
            if (score === target) {
                // add 1 to wins and start game over
                console.log("You win!");
                wins++;
                $("#winCounter").text(wins);
                startGame();
            // else if scoreCounter > targetNumber, player loses
            } else if (score > target) {
                // add 1 to losses and start game over
                console.log("You lose!");
                losses++;
                $("#lossesCounter").text(losses);
                startGame();
            }
        }


        // create gem prototype
        function Gem(buttonName, imgSrc) {
            this.selector = buttonName;
            this.img = imgSrc;
            this.value = getRandomIntInclusive(1, 12);
            this.createButton = function() {
                // create button
                var gemBtn = $("<button>");
                gemBtn.addClass("btn");
                gemBtn.attr("id", buttonName);
                gemBtn.attr("value", this.value);
                // place img inside button
                var gemImg = $("<img>");
                gemImg.attr("src", imgSrc);
                gemBtn.append(gemImg);
                // place button in DOM
                $("#btn-area").append(gemBtn);
            };
            this.clickHandler = function() {
                scoreCounter += parseInt(this.value);
                $("#scoreCounter").attr("value", scoreCounter);
                $("#scoreCounter").text(scoreCounter);
                checkForWin();
            };
        }

        // initialize 4 gems and show their values
        var greenGem = new Gem("greenGemBtn", "./assets/images/green.png");
        var blueGem = new Gem("blueGemBtn",  "./assets/images/blue.png");
        var purpleGem = new Gem("purpleGemBtn",  "./assets/images/purple.png");
        var orangeGem = new Gem("orangeGemBtn",  "./assets/images/orange.png");

        // create gems in the DOM
        greenGem.createButton();
        blueGem.createButton();
        purpleGem.createButton();
        orangeGem.createButton();

        // check gem values
        console.log(`
        Green Gem Value: ${greenGem.value}\n
        Blue Gem Value: ${blueGem.value}\n
        Purple Gem Value: ${purpleGem.value}\n
        Orange Gem Value: ${orangeGem.value}
        `)

        // when gem is clicked, run its clickHandler
        $("#greenGemBtn").click(greenGem.clickHandler);
        $("#blueGemBtn").click(blueGem.clickHandler);
        $("#purpleGemBtn").click(purpleGem.clickHandler);
        $("#orangeGemBtn").click(orangeGem.clickHandler);

    }

    // start game on page load
    startGame();

});