
var Questions = JSON.parse(sessionStorage.getItem("Questions")) || [];
var userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];
var Result = JSON.parse(sessionStorage.getItem("Result")) || 0;

var scoreBox = document.getElementById("scoreBox");
var resultsContainer = document.getElementById("resultsContainer");

//-------------------------------------------------------------------------------------------------
scoreBox.innerHTML = `
    Your Score: 
    <span class="text-green-400">${Result}</span> 
    / 
    <span>${Questions.length}</span>
`;

//-------------------------------------------------------------------------------------------------
Questions.forEach(function (question, index) {

    var userAnswerObj = userAnswersSession.find(q => q.QuestId == index);
    var userAnswer = userAnswerObj ? userAnswerObj.Answer : "Not Answered";
    var correctAnswer = question.Answer;

    var isCorrect = userAnswer === correctAnswer;

    var questionDiv = document.createElement("div");
    questionDiv.className = "p-5 rounded-xl bg-white/10";

    questionDiv.innerHTML = `
        <h2 class="font-bold mb-2">${question.Head}</h2>

        <div class="p-2 rounded 
            ${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}">
            Your Answer: ${userAnswer}
        </div>

        ${!isCorrect ? `
            <div class="p-2 mt-2 rounded bg-green-500/20 text-green-400">
                Correct Answer: ${correctAnswer}
            </div>
        ` : ""}
    `;

    resultsContainer.appendChild(questionDiv);
});