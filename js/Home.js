var UserGuard = JSON.parse(sessionStorage.getItem("UserGuard"));
if (!UserGuard) {
    location.replace("../html/Login.html");
}

/**
 * hazem 
 */

//---------------------------------------------------------------------------
const tokenUser = JSON.parse(sessionStorage.getItem("UserGuard"));
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(u => u.email === tokenUser);


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

//--------------------- Mohamed hassan-------------------------

var themeColor = document.getElementById("themeColor");

themeColor.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("bg-[#131e45]");
        document.body.classList.remove("bg-[#293d73]");
    } else {
        document.body.classList.add("bg-[#293d73]");
        document.body.classList.remove("bg-[#131e45]");
    }
});


var avatar = document.getElementById("avatar")
var menu = document.getElementById("menu")


avatar.addEventListener("click", function () {
    menu.classList.toggle("hidden");
})


var examBtn = document.getElementById("examBtn");
var resultBtn = document.getElementById("resultBtn");
var logOutBtn = document.getElementById("logOutBtn");


var hasResultDiv = document.getElementById("hasResultDiv");
var noResultDiv = document.getElementById("noResultDiv");
console.log(hasResultDiv);
console.log(noResultDiv);

let hasResult = users.some(element => element.email == UserGuard && element.Result != undefined);
if (hasResult) {
    Result_Modal = hasResultDiv;

} else {
    Result_Modal = noResultDiv;
}

examBtn.addEventListener("click", () => {
    window.location.replace("../html/Landing.html");
})

logOutBtn.addEventListener("click", () => {
    window.location.replace("../html/Login.html");
})


resultBtn.addEventListener("click", () => {
    Result_Modal.classList.remove("hidden");
    Result_Modal.classList.add("flex");
})

window.addEventListener('click', (e) => {
    if (e.target === Result_Modal) {
        Result_Modal.classList.add('hidden');
        Result_Modal.classList.remove('flex');
    }
});




