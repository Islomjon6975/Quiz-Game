import chalk from 'chalk';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

const QUESTIONS = {
  'What does HTML stand for? ': 'B',
  'Choose the correct HTML element for the largest heading? ': 'A',
  'What is the correct HTML element for inserting a line break? ': 'C',
  'What is the correct HTML for adding a background color? ': 'C',
  'Which character is used to indicate an end tag? ': 'C',
};

const OPTIONS = [
  [
    'A. Hyperlinks and Text Markup Language',
    'B. Hyper Text Markup Language',
    'C. Home Tool Markup Language',
    'D. None',
  ],
  ['A. <h1>', 'B. <h6>', 'C. <heading>', 'D. <head>'],
  ['A. <ib>', 'B. <break>', 'C. <br>', 'D. <blockquote>'],
  [
    'A. <body bg="yellow">',
    'B. <background>yellow</background>',
    'C. <body style="background-color:yellow;">',
    'D. None',
  ],
  ['A. *', 'B. ^', 'C. /', 'D. <'],
];

// Start Game
function newGame() {
  let questionNumber = 1;
  let guesses = [];
  let correctGuesses = 0;

  console.log(chalk.bgBlue.white(' Questions: '));

  for (let question in QUESTIONS) {
    console.log(chalk.green(`${questionNumber}. ${question}`));

    for (let option of OPTIONS[questionNumber - 1]) {
      console.log('   ' + chalk.magenta(option));
    }

    let guess = prompt(chalk.red('   Enter (A, B, C, or D): ')).toUpperCase();
    guesses = [...guesses, guess];

    // checking the guesses
    correctGuesses += checkAnswer(QUESTIONS[question], guess);

    questionNumber++;
  }

  //   Displaying Score
  displayScore(correctGuesses, guesses);
}

function checkAnswer(answer, guess) {
  if (answer === guess) {
    return 1;
  } else {
    return 0;
  }
}

function displayScore(correctGuesses, guesses) {
  let ANSWERS = 'Answers: ';
  let GUESSES = 'Guesses: ';

  for (let question in QUESTIONS) {
    ANSWERS += QUESTIONS[question] + ' ';
  }

  for (let guess of guesses) {
    GUESSES += guess + ' ';
  }
  console.log('========================================================');
  console.log('   ' + chalk.bgGreen(' Results: '));
  console.log('   ' + chalk.blue(ANSWERS));
  console.log('   ' + chalk.green(GUESSES));

  console.log(
    chalk.red(
      `   You answered ${correctGuesses} out of ${
        Object.keys(QUESTIONS).length
      } questions `
    )
  );
}

function playAgain() {
  console.log('========================================================');

  let response = prompt(
    chalk.blue('   Do you want to play again? (yes/no): ')
  ).toUpperCase();
  return response;
}

newGame();

while (playAgain() === 'YES') {
  console.log(chalk.bgGreen('Welcome to the Quiz Game!'));
  newGame();
}

console.log(chalk.green('   Bye! Thanks for participating!!!'));
