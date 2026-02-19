var ResultContainer = document.getElementById("result");

var result = JSON.parse(sessionStorage.getItem("Result"));

ResultContainer.textContent = result;



