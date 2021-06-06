// Variables
const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');

const quizQuestionElement = document.querySelector('#quiz__question');
const questionElement = document.querySelector('#question');
const answersBtnsElement = document.querySelector('#answers-btns');
const resultElement = document.querySelector('#result');
const timerElement = document.querySelector('#timer');
let questions = [];
let index;
let score = 0;

// Fetching data to questons array
fetch('questions.json')
  .then((response) => response.json())
  .then((data) => questions.push(...data));

// Functions
function startGame() {
  startBtn.classList.add('hide');
  quizQuestionElement.classList.remove('hide');
  resultElement.classList.remove('hide');
  timerElement.classList.remove('hide');
  resultElement.innerText = `0/${questions.length}`;
  score = 0;
  index = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[index]);
}

function selectAnswer(e) {
  let correct = e.target.dataset.correct;
  let answerBtns = document.querySelectorAll('.btn');
  if (correct) {
    e.target.classList.add('correct');
    e.target.innerHTML += ` <i class='fas fa-check-circle'></i>`;
    score++;
    resultElement.classList.remove('hide');
    resultElement.innerText = `${score}/${questions.length}`;
    nextBtn.classList.remove('hide');
  } else {
    e.target.classList.add('wrong');
    e.target.innerHTML += ` <i class="fas fa-times-circle"></i>`;
    startBtn.innerText = 'Restart';
    startBtn.classList.remove('hide');
    nextBtn.classList.add('hide');
  }

  Array.from(answerBtns).forEach((btn) => {
    if (btn != startBtn && btn != nextBtn) {
      return (btn.disabled = true);
    }
  });

  if (questions.length > index + 1) {
    return;
  } else {
    startBtn.innerText = 'Restart';
    startBtn.classList.remove('hide');
    nextBtn.classList.add('hide');
    resultElement.classList.remove('hide');
    resultElement.innerText = `Correct answers: ${score}/${questions.length} `;
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
    answersBtnsElement.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add('hide');

  while (answersBtnsElement.firstChild) {
    answersBtnsElement.removeChild(answersBtnsElement.firstChild);
  }
}

function showNextQuestion() {
  index++;
  setNextQuestion();
}

// Events
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', showNextQuestion);
