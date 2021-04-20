function getData() {
    var xhr = new XMLHttpRequest();
    var data;
    xhr.open("GET", "https://opentdb.com/api.php?amount=10");
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
}

getData();