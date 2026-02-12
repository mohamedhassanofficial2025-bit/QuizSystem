// ----------------Variables ------------------------

var SignUP = document.getElementById("registerBtn");


// ----------------Variables (input data)------------------------
var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var userConfirmPassword = document.getElementById("confirmPassword");


//-----------confirm catch variables---->>
// console.log(userName,userEmail,userPassword,userConfirmPassword);


/*----------------error span messages---------- */
var nameSpan = document.getElementById("name-span");
var emailSpan = document.getElementById("email-span");
var passwordSpan = document.getElementById("password-span");
var confirmPasswordSpan = document.getElementById("confirmPassword-span");

//-----------confirm catch variables---->>
// console.log(nameSpan, emailSpan, passwordSpan, confirmPasswordSpan);

const fullNameRegex = /^[A-Za-z]{2,}( [A-Za-z]{2,})+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const MessageEmpty = "this field is empty";
/*----------------------Regix variables--------------*/



/*------------------------validate fields----------------- */


/**
 * ---------------Name validation---------------------
 */
function validateName() {
    var nameValue = userName.value.trim();
    if (nameValue == "") {
        nameSpan.textContent = MessageEmpty;
        return 0;
    } else if (!fullNameRegex.test(nameValue)) {
        nameSpan.textContent = "Invalid Name";
        nameSpan.style.color = "red";
        userName.style.borderColor = "red";
        return 0;
    } else {
        nameSpan.textContent = "";
        userName.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}


userName.addEventListener("input", function () {
    validateName();
})


/**
 * ---------------email validation---------------------
 */
function validateEmail() {
    var emailValue = userEmail.value.trim();
    if (emailValue == "") {
        emailSpan.textContent = MessageEmpty;
        return 0;
    } else if (!emailRegex.test(emailValue)) {
        emailSpan.textContent = "Invalid email";
        emailSpan.style.color = "red";
        userEmail.style.borderColor = "red";
        return 0;
    } else {
        emailSpan.textContent = "";
        userEmail.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}


userEmail.addEventListener("input", function () {
    validateEmail();
})


/**
 * ---------------password validation---------------------
 */
function validatePassword() {
    var passwordValue = userPassword.value.trim();
    if (passwordValue == "") {
        passwordSpan.textContent = MessageEmpty;
        return 0;
    } else if (!passwordRegex.test(passwordValue)) {
        passwordSpan.textContent = "Invalid password Password must be 8+ chars, include uppercase, lowercase & number";
        passwordSpan.style.color = "red";
        userPassword.style.borderColor = "red";

        return 0;
    } else {
        passwordSpan.textContent = "";
        userPassword.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}

userPassword.addEventListener("input", function () {
    validatePassword();
})


/**
 * ---------------Confirm password validation---------------------
 */
function validateConfirmPassword() {

    var confirmPasswordValue = userConfirmPassword.value.trim();
    if (confirmPasswordValue == "") {
        confirmPasswordSpan.textContent = MessageEmpty;
        return 0;
    } else if (confirmPasswordValue !== userPassword.value.trim()) {
        confirmPasswordSpan.textContent = "Password not matched";
        confirmPasswordSpan.style.color = "red";
        userConfirmPassword.style.borderColor = "red";
        return 0;
    } else {
        confirmPasswordSpan.textContent = "";
        userConfirmPassword.style.borderColor = "rgba(116, 235, 213, 0.8)";
        return 1;
    }
}

userConfirmPassword.addEventListener("input", function () {
    validateConfirmPassword();
})



/*--------------------------signup validation--------------- */

var users = [];





function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function setDataToLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


function validateSignUP(e) {

    let SignUpState = validateName() && validateEmail() && validatePassword() && validateConfirmPassword();
    // console.log(SignUpState);
    e.preventDefault();//prevent usual behaviour

    //get data of  new user
    let userData = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
        confirmPassword: userConfirmPassword.value
    };

    // console.log(userData);




    if (SignUpState) {
        // document.querySelector(".Confirm-active").style.display = "block";


        users = getDataFromLocalStorage();


        var flag = false;
        if (users.length > 0) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === userEmail.value) {
                    flag = true;
                }
            }
            if (flag == false) {
                users.push(userData);
                ToastSuccessRegister();
            } else if (flag == true) {
                ToastFailRegister();
            }
        } else {
            users.push(userData);
        }
        setDataToLocalStorage(users);

        if (flag == false) {
            setTimeout(() => {
                location.replace("../html/Login.html");
            }, 1500);
        }
    }

}

// localStorage.clear();

SignUP.addEventListener("click", function (e) {
    validateSignUP(e);
})


var SuccessToast = document.getElementById("SuccessToast");
var FailToast = document.getElementById("FailToast");

console.log(SuccessToast, FailToast);

// Toast Register Success
function ToastSuccessRegister() {
    SuccessToast.classList.remove("opacity-0");
    SuccessToast.classList.add("opacity-100");

    setTimeout(function () {
        SuccessToast.classList.remove("opacity-100");
        SuccessToast.classList.add("opacity-0");
    }, 3000);
}

// Toast Register Fail
function ToastFailRegister() {
    FailToast.classList.remove("opacity-0");
    FailToast.classList.add("opacity-100");

    setTimeout(function () {
        FailToast.classList.remove("opacity-100");
        FailToast.classList.add("opacity-0");
    }, 3000);
}
