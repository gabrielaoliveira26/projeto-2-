/* ==========================
   MENU MOBILE
========================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

}


/* ==========================
   PORTAL DE ESCUTA
========================== */

const listeningForm = document.getElementById("listeningForm");

if (listeningForm) {

    listeningForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const feeling = document.getElementById("feeling").value;
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!feeling || !message) {

            formMessage.textContent =
                "Por favor, preencha os campos obrigatórios.";

            formMessage.style.color = "#b44c4c";

            return;
        }

        const userName = name || "você";

        formMessage.textContent =
            `Obrigado por compartilhar, ${userName}. Sua reflexão foi registrada nesta página.`;

        formMessage.style.color = "#557c6d";

        listeningForm.reset();

    });

}


/* ==========================
   QUIZ
========================== */

const questions = [

    {
        question: "Como você tem se sentido nos últimos dias?",
        answers: [
            "Bem e tranquilo(a)",
            "Mais ou menos",
            "Um pouco mal",
            "Muito mal"
        ]
    },

    {
        question: "Como está sua qualidade de sono?",
        answers: [
            "Tenho dormido bem",
            "Às vezes tenho dificuldade",
            "Tenho dormido pouco",
            "Meu sono está bastante prejudicado"
        ]
    },

    {
        question: "Você tem conseguido fazer coisas que gosta?",
        answers: [
            "Sim, com frequência",
            "Às vezes",
            "Raramente",
            "Quase nunca"
        ]
    },

    {
        question: "Quando algo difícil acontece, você consegue conversar com alguém?",
        answers: [
            "Sim, tenho pessoas de confiança",
            "Às vezes",
            "Tenho dificuldade",
            "Prefiro guardar tudo para mim"
        ]
    },

    {
        question: "Como você tem lidado com suas preocupações?",
        answers: [
            "Consigo lidar bem",
            "Fico preocupado(a) às vezes",
            "Tenho pensado muito nisso",
            "Sinto que as preocupações me sobrecarregam"
        ]
    },

    {
        question: "Você tem reservado algum tempo para cuidar de si?",
        answers: [
            "Sim, regularmente",
            "Quando consigo",
            "Pouco",
            "Quase nunca"
        ]
    }

];

const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const questionNumber = document.getElementById("questionNumber");
const progress = document.getElementById("progress");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const restartButton = document.getElementById("restartButton");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


/* MOSTRAR PERGUNTA */

function showQuestion() {

    selectedAnswer = null;
    nextButton.disabled = true;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");

        button.innerHTML = `
            <i class="fa-regular fa-circle"></i>
            ${answer}
        `;

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".answer")
                .forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            selectedAnswer = index;

            nextButton.disabled = false;

        });

        answersElement.appendChild(button);

    });

}


/* PRÓXIMA PERGUNTA */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        if (selectedAnswer === null) {
            return;
        }

        score += selectedAnswer;

        currentQuestion++;

        if (currentQuestion < questions.length) {

            showQuestion();

        } else {

            showResult();

        }

    });

}


/* RESULTADO */

function showResult() {

    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    const percentage =
        score / ((questions.length - 1) * questions.length) * 100;

    if (percentage <= 30) {

        resultTitle.textContent =
            "Você parece estar em um momento relativamente equilibrado.";

        resultText.textContent =
            "Continue valorizando o autocuidado, seus relacionamentos e os momentos de descanso. Pequenas atitudes podem ajudar a manter esse equilíbrio.";

    } else if (percentage <= 60) {

        resultTitle.textContent =
            "Talvez seja um bom momento para olhar mais para você.";

        resultText.textContent =
            "Alguns aspectos da sua rotina podem estar pesando emocionalmente. Tente reservar momentos para descansar, conversar com alguém de confiança e cuidar de suas necessidades.";

    } else {

        resultTitle.textContent =
            "Parece que você pode estar passando por um período difícil.";

        resultText.textContent =
            "Se esses sentimentos estiverem persistindo ou atrapalhando sua rotina, considere conversar com um profissional de saúde ou alguém de confiança. Você não precisa lidar com tudo sozinho(a).";

    }

}


/* REINICIAR */

if (restartButton) {

    restartButton.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;

        result.classList.add("hidden");
        quiz.classList.remove("hidden");

        showQuestion();

    });

}


/* INICIAR QUIZ */

if (quiz) {
    showQuestion();
}
