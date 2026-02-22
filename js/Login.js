var login = document.getElementById("loginBtn");

// console.log(login);

var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");

// console.log(userPassword)

var emailSpan = document.getElementById("email-span");
var passwordSpan = document.getElementById("password-span");

//console.log(emailSpan, passwordSpan);

//-------------------------------------------------------------

const fullNameRegex = /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const MessageEmpty = "This field is empty!";

//-------------------------------------------------------------

function validateEmail() {
    var emailValue = userEmail.value.trim();
    if (emailValue == "") {
        emailSpan.textContent = MessageEmpty;
        return 0;
    }
    else if (!emailRegex.test(emailValue)) {
        emailSpan.textContent = "Invalid email!";
        emailSpan.style.color = "red";
        userEmail.style.borderColor = "red";
        return 0;
    }
    else {
        emailSpan.textContent = "";
        userEmail.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}

userEmail.addEventListener("input", function () { validateEmail(); })

//----------------------------------------------------------------

function validatePassword() {
    var passwordValue = userPassword.value.trim();
    if (passwordValue == "") {
        passwordSpan.textContent = MessageEmpty;
        return 0;
    }
    else if (!passwordRegex.test(passwordValue)) {
        passwordSpan.textContent = "Invalid password Password must be 8+ chars, include uppercase, lowercase & number";
        passwordSpan.style.color = "red";
        userPassword.style.borderColor = "red";
        return 0;
    }
    else {
        passwordSpan.textContent = "";
        userPassword.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}

userPassword.addEventListener("input", function () {
    validatePassword();
})

//----------------------------------------------------------------------
var users = [];

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function validateLogin(e) {
    let loginState = validateEmail() && validatePassword();
    e.preventDefault();

    if (loginState) {


        users = getDataFromLocalStorage();

        var flag = false;
        if (users.length > 0) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === userEmail.value) {
                    if (users[i].password === userPassword.value) {
                        flag = true;
                    }
                }
            }

        }
        else {
            ToastFailLogin()
        }

        if (flag == true) {
            ToastSuccessLogin();
            sessionStorage.setItem("UserGuard", JSON.stringify(userEmail.value));

            let users = JSON.parse(localStorage.getItem("users"));
            let hasResult = users.some(element => element.email == userEmail.value && element.Result != undefined);
            setTimeout(() => {
                if (hasResult) {
                    location.replace("../html/Result.html");
                } else {
                    location.replace("../html/Landing.html");
                }
            }, 1000);
        }
        else {
            ToastFailLogin()
        }

    }

}

login.addEventListener("click", function (e) {
    validateLogin(e);
})


var SuccessToast = document.getElementById("SuccessToast");
var FailToast = document.getElementById("FailToast");

// Toast Register Success
function ToastSuccessLogin() {
    SuccessToast.style.opacity = 100;
    setTimeout(function () {
        SuccessToast.style.opacity = 0;
    }, 3000);
}

// Toast Register Fail
function ToastFailLogin() {
    FailToast.style.opacity = 100;
    setTimeout(function () {
        FailToast.style.opacity = 0;
    }, 3000);
}