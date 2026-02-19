if (!sessionStorage.getItem("UserGuard")) {
    location.replace("../html/Login.html");
} else { 
    const startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', function () {

        if (!sessionStorage.getItem("ExamTime")) {
            const duration = 10 * 60 * 1000; // 10 minutes
            const endTime = Date.now() + duration;
            sessionStorage.setItem("ExamTime", endTime);
        }


        window.location.href = "../html/Exam.html";
    });
}