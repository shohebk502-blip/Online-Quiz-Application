const questions = [
    {
        question: "What is the capital city of Bangladesh?",
        options: ["Chittagong", "Dhaka", "Rajshahi", "Khulna"],
        answer: "Dhaka"
    },
    {
        question: "What is the national animal of Bangladesh?",
        options: ["Elephant", "Royal Bengal Tiger", "Deer", "Lion"],
        answer: "Royal Bengal Tiger"
    },
    {
        question: "What is the national bird of Bangladesh?",
        options: ["Crow", "Doyel", "Eagle", "Parrot"],
        answer: "Doyel"
    },
    {
        question: "What is the national flower of Bangladesh?",
        options: ["Rose", "Sunflower", "Water Lily", "Lotus"],
        answer: "Water Lily"
    },
    {
        question: "What is the national fruit of Bangladesh?",
        options: ["Mango", "Banana", "Jackfruit", "Apple"],
        answer: "Jackfruit"
    },
    {
        question: "What is the currency of Bangladesh?",
        options: ["Rupee", "Dollar", "Taka", "Yen"],
        answer: "Taka"
    },
    {
        question: "What is the state language of Bangladesh?",
        options: ["English", "Hindi", "Bangla", "Arabic"],
        answer: "Bangla"
    },
    {
        question: "Which sea is located to the south of Bangladesh?",
        options: ["Arabian Sea", "Bay of Bengal", "Red Sea", "Black Sea"],
        answer: "Bay of Bengal"
    },
    {
        question: "What is the national fish of Bangladesh?",
        options: ["Rui", "Hilsa", "Katla", "Pangash"],
        answer: "Hilsa"
    },
    {
        question: "Which is the largest mangrove forest in the world?",
        options: ["Amazon Forest", "Sundarbans", "Congo Forest", "Borneo Forest"],
        answer: "Sundarbans"
    },
    {
        question: "What is the national mosque of Bangladesh?",
        options: ["Star Mosque", "Baitul Mukarram", "Chawk Mosque", "Bara Katra"],
        answer: "Baitul Mukarram"
    },
    {
        question: "What is the national game of Bangladesh?",
        options: ["Cricket", "Football", "Kabaddi", "Hockey"],
        answer: "Kabaddi"
    },
    {
        question: "Which place is famous for the longest natural sea beach in Bangladesh?",
        options: ["Kuakata", "Cox's Bazar", "Saint Martin", "Patenga"],
        answer: "Cox's Bazar"
    },
    {
        question: "When is Independence Day celebrated in Bangladesh?",
        options: ["21 February", "26 March", "16 December", "14 April"],
        answer: "26 March"
    },
    {
        question: "When is Victory Day celebrated in Bangladesh?",
        options: ["26 March", "21 February", "16 December", "14 December"],
        answer: "16 December"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let timeLeft = 30;
let timer;

const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const time = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const percentageText = document.getElementById("percentage");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    clearInterval(timer);

    selectedAnswer = "";
    timeLeft = 30;
    time.textContent = timeLeft;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    question.textContent = current.question;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    options.forEach((option, index) => {
        option.textContent = current.options[index];
        option.classList.remove("selected");
    });

    startTimer();
}

options.forEach(option => {
    option.addEventListener("click", function () {
        options.forEach(item => {
            item.classList.remove("selected");
        });

        this.classList.add("selected");
        selectedAnswer = this.textContent;
    });
});

nextButton.addEventListener("click", function () {
    if (selectedAnswer === "") {
        alert("Please select an answer.");
        return;
    }

    clearInterval(timer);

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        time.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

            currentQuestion++;

            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function showResult() {
    clearInterval(timer);

    quiz.style.display = "none";
    result.style.display = "block";

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    scoreText.textContent =
        `Your Score: ${score} / ${questions.length}`;

    percentageText.textContent =
        `Percentage: ${percentage}%`;

    if (percentage >= 80) {
        message.textContent =
            "Excellent! You have a great knowledge.";
    } else if (percentage >= 60) {
        message.textContent =
            "Very Good! Keep practicing.";
    } else if (percentage >= 40) {
        message.textContent =
            "Good effort! You can improve.";
    } else {
        message.textContent =
            "Keep practicing and try again.";
    }
}

restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = "";

    result.style.display = "none";
    quiz.style.display = "block";

    loadQuestion();
});

loadQuestion();