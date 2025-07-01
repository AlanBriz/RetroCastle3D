// Array of quiz questions
const questions = [
  {
    question: "Which console featured Super Mario 64?",
    choices: ["PlayStation", "Nintendo 64", "Dreamcast", "Saturn"],
    answer: "Nintendo 64"
  },
  {
    question: "Which developer made Metal Gear Solid 3?",
    choices: ["Konami", "Capcom", "Square Enix", "Namco"],
    answer: "Konami"
  },
  {
    question: "What year did the PlayStation 2 launch?",
    choices: ["1998", "1999", "2000", "2001"],
    answer: "2000"
  },
  {
    question: "Which game is known for its 'Triforce' symbol?",
    choices: ["Final Fantasy VII", "The Legend of Zelda: Ocarina of Time", "Metal Gear Solid", "Resident Evil"],
    answer: "The Legend of Zelda: Ocarina of Time"
  },
  {
    question: "What was the first 3D Sonic game?",
    choices: ["Sonic Adventure", "Sonic R", "Sonic CD", "Sonic Heroes"],
    answer: "Sonic R"
  },
];

let currentQuestion = 0;
let score = 0;

document.getElementById("startBtn").addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("feedback").textContent = "";
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }

  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = ""; // Clear previous question

  let q = questions[currentQuestion];

  const questionElem = document.createElement("h2");
  questionElem.textContent = q.question;
  questionElem.classList.add("quiz-question");
  quizDiv.appendChild(questionElem);

  q.choices.forEach(choice => {
  const btn = document.createElement("button");
  btn.textContent = choice;
  btn.classList.add("quiz-btn");
  btn.addEventListener("click", () => checkAnswer(choice));
  quizDiv.appendChild(btn);

  });
}

function checkAnswer(choice) {
  let feedback = document.getElementById("feedback");
  if (choice === questions[currentQuestion].answer) {
    feedback.textContent = "Correct!";
    feedback.style.color = "#63ff78";
    score++;
  } else {
    feedback.textContent = `Wrong! The correct answer was: ${questions[currentQuestion].answer}`;
    feedback.style.color = "#ff5454";
  }
  currentQuestion++;
  setTimeout(showQuestion, 1500);
}

function endQuiz() {
  document.getElementById("quiz").innerHTML = `<h2 class="quiz-finished">Quiz Finished!</h2>`;
  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = `Your score: ${score}`;

  // Save to localStorage
  localStorage.setItem("3dQuizHighScore", score);
}
