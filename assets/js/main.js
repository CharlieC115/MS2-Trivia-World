let gameState;

// Code for calling the API
fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
    .then(response => response.json())
    .then(json_data => {

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

// Code used to add an event listener to each button
function setupGame() {
    [0, 1, 2, 3].forEach(i => document.getElementById(`answer-${i}`).addEventListener('click', onAnswer));
    displayNextQuestion();
}

// Code for displaying the questions and answers within the heading and button tags in trivia.html
// Code added for displaying score in trivia.html
function displayNextQuestion() {

    if (gameState.currentQuestion === gameState.questions.length - 1) {
        showEndGame()
        document.getElementById('final-score').textContent = gameState.score;
    } else {
        gameState.currentQuestion++;

        // Code below is for UI
        document.getElementById('score').textContent = gameState.score;
        let question = gameState.questions[gameState.currentQuestion];
        document.getElementById('question').innerHTML = question.question;
        question.answers.forEach((answer, i) => {
            document.getElementById(`answer-${i}`).innerHTML = answer;
        });
    }
}

// Code used to hide user results section until questions are finished and then it will hide questions section
function showEndGame() {
    document.getElementById('questions-section').style['display'] = 'none';
    document.getElementById('user-results').style['display'] = 'block';
}

// Function for collecting the data needed from the API 4 answers, the correct answer and the question
function loadQuestions(data) {
    return data.results
        .map(quest => {
            let answers = quest.incorrect_answers;
            answers.push(quest.correct_answer);
            answers.sort((a, b) => 0.5 - Math.random());
            return {
                question: quest.question,
                correctAnswer: quest.correct_answer,
                answers
            };
        });
}