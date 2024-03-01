const startButton = document.getElementById("startButton");
const content = document.querySelector(".content"); // Sélectionnez le contenu du quiz
const questionElement = document.querySelector(".question");
const resultat = document.querySelector(".resultat");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const elapsedTimeElement = document.querySelector(".elapsed-time"); // Sélectionnez l'élément pour afficher le temps écoulé

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;
let elapsedTime = 0; // Temps écoulé en secondes

startButton.addEventListener("click", startQuiz);

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  elapsedTime = 0; // Réinitialiser le temps écoulé
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  clearInterval(intervalId); // Arrêter le décompte du temps écoulé
  textFinish.innerHTML = `Votre résultat est ${questionsCorrect} sur ${questions.length}. Temps total : ${elapsedTime} secondes.`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  resultat.innerHTML = "";
  questionElement.innerHTML = item.question;

  item.resultat.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    resultat.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

function startQuiz() {
  startButton.style.display = "none";
  content.style.display = "flex";
  loadQuestion();
}

// Démarrez le décompte du temps écoulé
const intervalId = setInterval(() => {
  elapsedTime++; // Incrémentez le temps écoulé de 1 seconde à chaque intervalle
  // Mettre à jour l'affichage du temps écoulé dans l'interface utilisateur
  elapsedTimeElement.textContent = `Temps: ${elapsedTime} s`;
}, 1000); // Mettez à jour le décompte toutes les 1 seconde (1000 millisecondes)
