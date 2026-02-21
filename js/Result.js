
if (!sessionStorage.getItem("UserGuard")) {
    location.replace("../html/Login.html");
}

//---------------------------------------------------------------------------
const tokenUser = JSON.parse(sessionStorage.getItem("UserGuard"));
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(u => u.email === tokenUser);

if (!user || user.Result === undefined) {
    location.replace("../html/Landing.html");
}

//----------------------------------------------------------------------------
const userName = document.getElementById("userName");
userName.textContent = `Student: ${user.name}`;

//--------------------------------------------------------------------------------
const Questions = JSON.parse(localStorage.getItem("Questions")) || [];
const totalQuestions = Questions.length;
const score = user.Result || 0;
const percentage = ((score / totalQuestions) * 100).toFixed(2);

//-------------------------------------------
const scoreBox = document.getElementById("scoreBox");
const percentageText = document.getElementById("percentageText");

scoreBox.textContent = `Score: ${score} / ${totalQuestions}`;
percentageText.textContent = `${percentage}%`;