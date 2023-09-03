// VSCODE ENABLE PROMPT //
// Delete this line if prompt() works natively on your client!
const prompt = require("prompt-sync")({ sigint: true });

// GAME DEFINITION //
class Game {
	constructor() {
		this.currentAnswer =
			currentAnswerBank[Math.floor(Math.random() * currentAnswerBank.length)];

		this.currentLives = 5;
		this.usedLetters = [];

		this.hiddenAnswer = hiddenAnswerUpdate(this.currentAnswer);

		this.gameOver = false;
	}
}

// POSSIBLE ANSWERS //
const currentAnswerBank = [
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
	const userInput = prompt("Enter a letter to guess: ");

	if (checkInputValidLetter(userInput)) {
		return userInput;
	} else {
		console.log("That was not a valid input! Try again");
		userInputRequest();
	}
}

// Checks if user input is valid
function checkInputValidLetter(input) {
	// Boolean is input a single char?
	const singleLetter = input.length === 1;

	// Boolean is input a new char?
	const newLetter = !currentGame.usedLetters.includes(input);

	// If input meets both criteria return true
	return singleLetter && newLetter;
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
			console.log(`No ${input.toUpperCase()} in this word!`);
			console.log(`You have ${currentGame.currentLives} lives left!`);
			console.log(currentGame.hiddenAnswer);
		}
	}
	// Else share updated progress and prompt again
	else {
		console.log(
			`Your guess ${input.toUpperCase()} appears ${changeCounter} times(s)!`,
		);
		console.log(currentGame.hiddenAnswer);
	}
}

function checkAlive() {
	if (currentGame.currentLives <= 0) {
		return lose();
	}
}

function win() {
	console.log("You got it right!");
	currentGame.gameOver = true;
	playAgain();
}

function lose() {
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
		console.log("Thanks for playing!");
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

//add a play again feature when you get game over: yes start the program over no, terminate program

//add a score feature to each letter and multiply each unguessed letter by 2x.

//create an image of the hangman instead a life counter
