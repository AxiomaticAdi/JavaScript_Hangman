/* ORGANIZATION 

Sections are in the following order:
  Definitions
  Helper functions
    - Guess / Input Type Helpers
    - Guess helpers (full word)
    - Input helpers (single letter)
    - Game status helpers (status, checkwinlose, etc.)
  Main function (hangman)
  
*/

// DEFINITIONS //
const answerBank = [
	"APPLE",
	"BLAZE",
	"CHART",
	"DRONE",
	"EXCEL",
	"FLAME",
	"GHOST",
	"HASTE",
	"INLET",
	"JUMBO",
	"KNIFE",
	"LEMUR",
	"MIGHT",
	"NOMAD",
	"OCEAN",
	"PRIZE",
	"QUOTA",
	"RINSE",
	"STOVE",
	"TWIST",
	"UNBOX",
	"VEXED",
	"WHILE",
	"XENON",
	"YIELD",
];

class HangmanGame {
	constructor() {
		//NEEDS COMMENTS
		//arrayOfAnswers will have hardcoded strings with the potential answers the game will use
		this.arrayOfAnswers = answerBank;
		this.answer = answerUpdates(this.arrayOfAnswers);
		this.hiddenAnswer = hiddenAnswerUpdates(this.answer);
		this.usedLetters = [];
		this.lives = 5;
		this.continueGame = true;
	}
}

// HELPER FUNCTIONS //

// GUESS VS. INPUT HELPERS //

//user chooses to guess a letter or a word
function chooseGuess() {
	while (currentGame.continueGame) {
		displayGameState(
			currentGame.hiddenAnswer,
			currentGame.usedLetters,
			currentGame.lives,
		);

		//Ask user if they want to guess a word or a letter
		console.log("Would you like to guess a letter or the word?\n");
		let guessType = prompt(
			"Type 'letter' to guess a letter or 'word' to guess a word",
		).toLowerCase();
		console.log("");

		if (guessType == "letter") {
			validGuessType = true;
			//takes in a letter as an input and processes the letter to see if it's valid and updates the game state
			guessLetter();
			checkWinLose();
		} else if (guessType == "word") {
			validGuessType = true;
			//takes in a string as an input and processes the string to see if it's valid and updates the game state
			guessWord();
			checkWinLose();
		} else {
			console.log("Invalid option, try again");
		}
	}
}

// GUESS HELPERS (FULL WORD) //

function guessWord() {
	let wordGuess = prompt("Please enter your word guess").toUpperCase();

	if (wordGuess === currentGame.answer) {
		console.log("You guessed the whole Word! Congratulations!");
		currentGame.hiddenAnswer = currentGame.answer.split("");
	} else {
		currentGame.lives = 0;
	}
	return;
}

function processGuess(guess) {
	// Condition 1: guess is incorrect
	// Result: Decrement lives + checkalive
	if (guess !== answer) {
		lives--;
		checkAlive();
	}
	// Condition 2: guess is correct
	else {
		win();
	}
}

// INPUT HELPERS (SINGLE LETTER) //

function guessLetter() {
	do {
		// Ask for letter
		userInput = prompt("Enter a letter to guess").toUpperCase();
		console.log();
		inputValid = false;

		// Check if 1 character
		if (userInput.length !== 1) {
			console.log("");
			console.log("Please enter only one character.");
		}

		// Check if between A and Z
		else if (checkInputNotChar(userInput)) {
			console.log("");
			console.log("Your guess must be a letter between A and Z");
		}

		// Check if letter is repeated
		else if (checkInputNotNew(userInput, currentGame.usedLetters)) {
			console.log("");
			console.log("You have already guessed this letter.");
			console.log(`Your current guesses include
      ${currentGame.usedLetters}`);
		} else {
			inputValid = true;
		}
	} while (!inputValid);

	// Process valid input
	processInput(userInput);
}

function processInput(input) {
	currentGame.usedLetters.push(input);
	let changeCounter = 0;

	// update hiddenAnswer
	for (let i = 0; i < currentGame.answer.length; i++) {
		if (currentGame.answer[i] == input) {
			changeCounter++;
			currentGame.hiddenAnswer[i] = input;
		}
	}

	// If complete miss, update lives
	if (changeCounter < 1) {
		console.log("Your guess was wrong!\n");
		currentGame.lives--;
	}
	// If word completed, trigger WIN
	// else if (!currentGame.hiddenAnswer.includes("_")) {
	//   win();
	// }
}

// Returns TRUE if input is not a valid character
function checkInputNotChar(input) {
	return !input.match(/[A-Z]/i);
}

// Returns TRUE if input has already been guessed this game
function checkInputNotNew(input, usedLetters) {
	return usedLetters.includes(input);
}

// GAME STATUS HELPERS //

function checkWinLose() {
	if (currentGame.lives === 0) {
		console.log("Sorry, you have lost ");
		currentGame.continueGame = false;
	}
	//if the answer has been guessed
	if (currentGame.hiddenAnswer.indexOf("_") === -1) {
		console.log("You Did It, Congratulations!");
		currentGame.continueGame = false;
	}
}

function displayGameState(hiddenAnswer, usedLetters, lives) {
	let gameState = {
		word: `${hiddenAnswer.join("")}`,
		usedLetters: `${usedLetters}`,
		livesLeft: `${lives}`,
	};
	console.table(gameState);
}

//Function that randomly chooses an answer from the answer array
function answerUpdates(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

//Function that initalizes hiddenAnswer to an array the same length as the answer and hides all the letters
function hiddenAnswerUpdates(str) {
	return Array(str.length).fill("_");
}

// MAIN FUNCTION //

function hangman() {
	console.log(""); // Line break

	let playGame = true;
	while (playGame) {
		console.log("Welcome to CS Prep Hangman!");
		currentGame = new HangmanGame();

		//logic for choosing levels should exist here

		// Main game loop
		chooseGuess();

		let checkPlayAgain = undefined;
		while (checkPlayAgain == undefined) {
			checkPlayAgain = prompt(
				"Would you like to play again? Type 'Y/N'",
			).toUpperCase();
			if (checkPlayAgain == "N") {
				playGame = false;
				return "Thanks for playing!";
			} else if (checkPlayAgain != "Y") {
				checkPlayAgain = undefined;
				console.log("Please type 'Y' to play again or 'N' to stop playing");
			} else {
				checkPlayAgain = "Y";
			}
		}
	}
}

hangman();
