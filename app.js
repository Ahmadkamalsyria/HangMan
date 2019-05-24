var riddles = [
  {
    riddle: [
      "The thunder comes before the lightning,",
      "And the lightning comes before the cloud,",
      "The rain dries all the land it touches,",
      "Wrapping the earth in a blood red shroud."
    ],
    answer: "VOLCANO"
  },

  {
    riddle: [
      "I can eat everything",
      "but I can't drink anything",
      "so tell me who I am"
    ],
    answer: "FIRE"
  },

  {
    riddle: ["Something you have", "but the others use it more than you"],
    answer: "NAME"
  }
];

var startBtn = document.querySelector("#startBtn");
var msgField = document.querySelector("#messageField");
var gameFooter = document.querySelector(".gameFooter");
var lifeCount = document.querySelector("#lifeCount");
var wrongLetters = document.querySelector("#wrongGuesses");
var winsCount = document.querySelector("#wins");
var wins = 0;

startBtn.onclick = function() {
  gameStart();
};

function gameStart() {
  var score = 0;
  var chances = 7;
  var rightGuess = [];
  var wrongGuess = [];
  lifeCount.innerHTML = chances + " attempts left";
  winsCount.innerHTML = "Wins: " + wins;
  wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;

  var randRiddle = riddles[Math.floor(Math.random() * riddles.length)];

  var randAnswer = randRiddle.answer;

  var letterArr = randRiddle.answer.split("");
  console.log(randRiddle.answer);
  console.log(letterArr);

  gameFooter.innerHTML = '<div class="wordWrap"></div>';
  var wordWrap = document.querySelector(".wordWrap");

  for (var i = 0; i < letterArr.length; i++) {
    var mask = document.createElement("span");
    mask.className = "mask";
    mask.id = "id" + i;
    wordWrap.appendChild(mask);
  }

  msgField.innerHTML = '<div class="riddleWrap"></div>';
  var riddleWrap = document.querySelector(".riddleWrap");

  for (var i = 0; i < randRiddle.riddle.length; i++) {
    var line = document.createElement("li");
    riddleWrap.appendChild(line);
    line.innerHTML = randRiddle.riddle[i] + "</br>";
  }

  document.onkeyup = function(event) {
    var keyInput = event.key.toUpperCase();
    var letterIndex = letterArr.indexOf(keyInput);
    var keyInputCode = keyInput.charCodeAt(0);

    if (keyInput.length == 1 && (keyInputCode >= 65 && keyInputCode <= 99)) {
      if (letterIndex !== -1) {
        if (rightGuess.indexOf(keyInput) === -1) {
          rightGuess.push(keyInput);

          for (var i = 0; i < randAnswer.length; i++) {
            if (keyInput === randAnswer.charAt(i)) {
              var unMask = document.getElementById("id" + i);
              unMask.className = "unMask";
              unMask.innerHTML = keyInput;

              score++;
            }

            if (score === randAnswer.length) {
              wrongGuess.length = 0;
              wrongLetters.innerHTML = "";
              var newBtn =
                "<div class='btnWrap'><button id='playAgain' class='btn' autofocus>PLAY AGAIN</button></div>";
              riddleWrap.innerHTML = "<p>YOU WIN!</p></br>" + newBtn;
              wrongLetters.innerHTML = "Wrong Guesses: ";
              var playAgain = document.querySelector("#playAgain");
              playAgain.onclick = function() {
                wins++;
                gameStart();
              };
            }
          }
        }
      } else {
        if (chances > 0 && wrongGuess.indexOf(keyInput) === -1) {
          wrongGuess.push(keyInput);

          chances--;
          lifeCount.innerHTML = chances + " attempts left";
          wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;
        }

        if (chances == 0) {
          var newBtn =
            "<div class='btnWrap'><button id='tryAgain' class='btn' autofocus>TRY AGAIN</button></div>";
          riddleWrap.innerHTML = "<p>YOU LOSE!</p></br>" + newBtn;
          var tryAgain = document.querySelector("#tryAgain");
          wrongGuess.length = 0;
          wrongLetters.innerHTML = "Wrong Guesses: ";
          document.onkeyup = function(event) {
            console.log("you lost");
          };
          tryAgain.onclick = function() {
            gameStart();
          };
        }
      }
    }
  };
}
