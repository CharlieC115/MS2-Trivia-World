function getData() {
    var xhr = new XMLHttpRequest();
    var data;
    xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            parseData(data);
        }
    };
}

function parseData(data) {
    console.log("DATA IS: ", data);

    let question1 = document.getElementById('question1');
    question1.innerHTML = data.results[0].question;
    let question2 = document.getElementById('question2');
    question2.innerHTML = data.results[1].question;
    let question3 = document.getElementById('question3');
    question3.innerHTML = data.results[2].question;
    let question4 = document.getElementById('question4');
    question4.innerHTML = data.results[3].question;
    let question5 = document.getElementById('question5');
    question5.innerHTML = data.results[4].question;
}

getData();