// Code for calling the API
fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
    .then(response => response.json())
    .then(json_data => {
        console.log(json_data);
        showData(json_data);
    });

// Function for collecting the data needed from the API 4 answers, the correct answer and the question
function showData(data) {
    return data.results
        .map(quest => {
            let answers = quest.incorrect_answers;
            answers.push(quest.correct_answers);
            return {
                question: quest.question,
                correct_answer: quest.correct_answer,
                answers
            };
        });
}