let gameState;

// Code for calling the API
fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
    .then(response => response.json())
    .then(json_data => {
        console.log(json_data);

        gameState = {
            questions: loadQuestions(json_data),
            currentQuestion: -1,
            score: 0
        }

        setupGame();
    });

// Code for stopping the button from submitting, increasing score by one when correct answer is selected and pulling the values for selected answer and correct answer
function onAnswer(event) {
    event.preventDefault();
    let isCorrect = checkAnswer(gameState.questions[gameState.currentQuestion].correctAnswer,
        event.target.textContent
    );
    gameState.score += (isCorrect ? 1 : 0);
    displayNextQuestion();
}

// Code for checking the selected answer against the actual answer
function checkAnswer(correct, given) {
    return correct === given;
}

function setupGame() {
    [0, 1, 2, 3].forEach(i => document.getElementById(`answer-${i}`).addEventListener('click', onAnswer));
    displayNextQuestion();
}

// Code for displaying the questions and answers within the heading and button tags in trivia.html
function displayNextQuestion() {
    gameState.currentQuestion++;
    let question = gameState.questions[gameState.currentQuestion];
    document.getElementById('question').textContent = question.question;
    question.answers.forEach((answer, i) => {
        document.getElementById(`answer-${i}`).innerHTML = answer;
    });
}

// Function for collecting the data needed from the API 4 answers, the correct answer and the question
function loadQuestions(data) {
    return data.results
        .map(quest => {
            let answers = quest.incorrect_answers;
            answers.push(quest.correct_answer);
            return {
                question: quest.question,
                correctAnswer: quest.correct_answer,
                answers
            };
        });
}