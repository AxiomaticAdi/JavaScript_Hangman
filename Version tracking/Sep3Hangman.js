// VSCODE ENABLE PROMPT //
// Delete this line if prompt() works natively on your client!
const prompt = require("prompt-sync")({ sigint: true });

// GAME DEFINITION //
class Game {
	constructor() {
		this.currentAnswer =
			answerBank[Math.floor(Math.random() * answerBank.length)];

		this.currentLives = 5;
		this.usedLetters = [];

		this.hiddenAnswer = hiddenAnswerUpdate(this.currentAnswer);

		this.gameOver = false;
	}
}

// POSSIBLE ANSWERS //
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

// HELPER FUNCTIONS //

// Creates array of dashes to represent unkown answer
function hiddenAnswerUpdate(string) {
	return Array(string.length).fill("_");
}

// Prompt user for input
function userInputRequest() {
	console.log(""); // Line break
	const userInput = prompt("Enter a letter to guess: ").toUpperCase();

	if (checkInputNotChar(userInput)) {
		console.log("");
		console.log("Your guess must be a letter between A and Z");
		userInputRequest();
	} else if (checkInputNotNew(userInput)) {
		console.log("");
		console.log("You have already guessed this letter.");
		console.log(`Your current guesses include ${currentGame.usedLetters}`);
		userInputRequest();
	}
	// If input clears all checks, return input (already uppercase)
	else {
		return userInput;
	}
}

// Returns TRUE if input is NOT a character
function checkInputNotChar(input) {
	return !(input.length === 1 && input.match(/[A-Z]/i));
}

// Returns TRUE if input has already been guessed this game
function checkInputNotNew(input) {
	return currentGame.usedLetters.includes(input);
}

function processInput(input) {
	// Update usedLetters
	currentGame.usedLetters.push(input);
	let changeCounter = 0;

	// Update hiddenAnswer
	for (let i = 0; i < currentGame.currentAnswer.length; i++) {
		//traverse through the answer array
		if (currentGame.currentAnswer[i] === input) {
			//if the input matches the element in the array
			changeCounter++;
			currentGame.hiddenAnswer[i] = input; //the element at the corresponding index in the hiddenAnswer is revealed
		}
	}

	// Check win
	if (!currentGame.hiddenAnswer.includes("_")) {
		return win();
	}

	// If incorrect input, decrement lives
	if (changeCounter < 1) {
		// if the input didn't match any of the letters in the answer
		currentGame.currentLives--;

		// Check alive
		if (currentGame.currentLives <= 0) {
			return lose();
		} else {
			console.log(`No ${input} in this word!`);
			console.log(`You have ${currentGame.currentLives} lives left!`);
			console.log(currentGame.hiddenAnswer);
		}
	}
	// Else share updated progress and prompt again
	else {
		console.log(`Your guess ${input} appears ${changeCounter} time(s)!`);
		console.log(currentGame.hiddenAnswer);
	}
}

function checkAlive() {
	if (currentGame.currentLives <= 0) {
		return lose();
	}
}

function win() {
	console.log("");
	console.log("You got it right!");
	console.log(`The current answer was ${currentGame.currentAnswer}`);
	currentGame.gameOver = true;
	playAgain();
}

function lose() {
	console.log("");
	console.log(`You lost - the correct answer was ${currentGame.currentAnswer}`);
	currentGame.gameOver = true;
	playAgain();
}

function playAgain() {
	const playAgainInput = prompt("Do you want to play again? (y/n): ");
	if (
		playAgainInput === "y" ||
		playAgainInput === "Y" ||
		playAgainInput === "yes"
	) {
		return hangman();
	} else {
		console.log("");
		console.log("Thanks for playing!");
		console.log("");
		return process.exit();
	}
}

// MAIN EXECUTIVE FUNCTION //
function hangman() {
	console.log(""); // Line break

	console.log("Welcome to CS Prep Hangman!");
	currentGame = new Game();

	console.log("Can you guess this word?");
	console.log(currentGame.hiddenAnswer);

	console.log("Time to guess a letter!");

	while (!currentGame.gameOver) {
		console.log("");
		const currentInput = userInputRequest();
		processInput(currentInput);
	}
}

let currentGame = new Game();
hangman();

// additional features to add:
//have the player choose if they would like to add a letter or complete the word

//difficulty choice: can choose easy medium or hard and each one will give you a different length of word to solve

//add a score feature to each letter and multiply each unguessed letter by 2x.

//create an image of the hangman instead a life counter
