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

        setupGame(gameState);
    });

function setupGame(gameState) {
    displayNextQuestion();
}

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
                correct_answer: quest.correct_answer,
                answers
            };
        });
}