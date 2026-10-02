const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a skill that improves with practice.",
  "JavaScript is a versatile programming language.",
  "Speed typing tests are fun and challenging.",
  "Practice makes perfect in everything you do."
];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

let startTime;
let currentQuote = "";

function startTest() {
  // Reset everything
  inputElement.value = "";
  resultElement.textContent = "";
  inputElement.disabled = false;
  inputElement.focus();
  timerElement.textContent = "Time: 0s";

  // Pick a random quote
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = currentQuote;

  // Start the timer
  startTime = new Date();
  startButton.disabled = true;

  // Listen for input
  inputElement.addEventListener("input", checkInput);
}

function checkInput() {
  const typedText = inputElement.value;

  // Check if the input matches the quote
  if (typedText === currentQuote) {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    resultElement.textContent = `You completed the test in ${elapsedTime} seconds!`;
    inputElement.disabled = true;
    startButton.disabled = false;
  }
}

startButton.addEventListener("click", startTest);
