const questions = [
  {
    question: "Which planet is called the Red Planet?",
    options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Mercury"],
    answer: "b",
    hint: "It's the 4th planet from the sun.",
  },
  {
    question: "Which language is used for styling webpages?",
    options: ["A) JavaScript", "B) Python", "C) CSS", "D) HTML"],
    answer: "c",
    hint: "It controls colors, layout, spacing.",
  },
  {
    question: "Which gas do plants absorb?",
    options: ["A) Oxygen", "B) Carbon Dioxide", "C) Nitrogen", "D) Hydrogen"],
    answer: "b",
    hint: "The gas symbol is CO₂.",
  },
  {
    question: "HTML is used for?",
    options: ["A) Logic", "B) Structure", "C) Styling", "D) Server"],
    answer: "b",
    hint: "Think headings, paragraphs, content.",
  },
];

let score = 0;
let current = 0;
let userName = localStorage.getItem("quiz_user") || "Guest";

const QUESTION_TIME = 12;
let timer;
let timeUp = false;

startQuiz();

function startQuiz() {
  score = 0;
  current = 0;
  alert("Welcome " + userName + "! Your quiz is starting...");
  askQuestion();
}

function askQuestion() {
  if (current >= questions.length) {
    finishQuiz();
    return;
  }

  timeUp = false;

  const q = questions[current];

  let text =
    `Question ${current + 1}/${questions.length}\n` +
    q.question +
    "\n\n" +
    q.options.join("\n") +
    `\n\n(You have ${QUESTION_TIME} seconds)\nEnter option (A/B/C/D):`;

  timer = setTimeout(() => {
    timeUp = true;
  }, QUESTION_TIME * 1000);

  const answer = prompt(text);

  clearTimeout(timer);

  if (timeUp) {
    alert("⏳ Time's up! Correct answer was: " + q.answer.toUpperCase());
    alert("Hint: " + q.hint);
    current++;
    askQuestion();
    return;
  }

  if (!answer) {
    alert("No input given. Moving to next question.");
    current++;
    askQuestion();
    return;
  }

  const userAns = answer.trim().toLowerCase();

  if (userAns === q.answer) {
    score++;
    alert("✔ Correct!");
  } else {
    alert("✖ Wrong! Correct answer was: " + q.answer.toUpperCase());
    alert("Hint: " + q.hint);
  }

  current++;
  askQuestion();
}

function finishQuiz() {
  alert(`Quiz Finished!\nYour Score: ${score}/${questions.length}`);

  let percentage = (score / questions.length) * 100;
  let remark =
    percentage >= 90
      ? "Excellent!"
      : percentage >= 70
      ? "Great job!"
      : percentage >= 50
      ? "Good try!"
      : "Keep practicing!";

  alert("Performance: " + remark);

  saveHighScore();

  const again = confirm("Do you want to restart?");
  if (again) startQuiz();
}

function saveHighScore() {
  const hs = JSON.parse(localStorage.getItem("quiz_scores") || "[]");

  hs.push({ name: userName, score: score, time: new Date().toISOString() });

  hs.sort((a, b) => b.score - a.score);

  localStorage.setItem("quiz_scores", JSON.stringify(hs.slice(0, 5)));

  let list = "Top Scores:\n";
  hs.slice(0, 5).forEach((s, i) => {
    list += `${i + 1}. ${s.name} — ${s.score}/${questions.length}\n`;
  });

  alert(list);
}

function setUserName() {
  const n = prompt("Enter your name:");
  if (n) {
    userName = n.trim();
    localStorage.setItem("quiz_user", userName);
    alert("Name saved!");
  }
}
