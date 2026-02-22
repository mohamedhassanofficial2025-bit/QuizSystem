if (!sessionStorage.getItem("UserGuard")) {
    location.replace("../html/Login.html");
} else { 
    /**
     * check if user has result
     */
    function checkuserResult() {
        var UserEmail = JSON.parse(sessionStorage.getItem("UserGuard"));
        console.log(UserEmail)
        let users = JSON.parse(localStorage.getItem("users"));
        console.log(users)
        let hasResult = users.some(element => element.email == UserEmail && element.Result != undefined);
        console.log(hasResult);
        if (hasResult) {
            location.replace("../html/Result.html");
        }
    }
    checkuserResult();


    const startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', function () {

        if (!sessionStorage.getItem("ExamTime")) {
            const duration = 10 * 60 * 1000; // 10 minutes
            const endTime = Date.now() + duration;
            sessionStorage.setItem("ExamTime", endTime);
        }


        window.location.replace("../html/Exam.html");
    });
}