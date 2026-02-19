//making user Guard

if (!sessionStorage.getItem("UserGuard")) {
    location.replace("../html/Login.html");
} else {
    /**
 * implementation of body of Exam
 */


    // variables
    //catch radio for the Questions
    var QuestionHead = document.getElementById("QuestionHead");
    var AnswerOptions = document.getElementsByClassName("AnswerOptions");

    //turn AnswerOptions(Nodelist) to Array
    AnswerOptionsArrayBtns = [];
    for (var i = 0; i < AnswerOptions.length; i++) {
        AnswerOptionsArrayBtns.push(AnswerOptions[i]);
    }

    var QuestionId = document.getElementById("QuestionId");

    var PrevousBtn = document.getElementById("PrevousBtn");
    var NextBtn = document.getElementById("NextBtn");


    var TrackBtnsNodeList = document.getElementsByClassName('TrackBtns');

    /**
     * this is NodeList like Array it is not Array
     * to use foreach you should turn it to Array first
     */
    var TrackBtns = [];

    for (var i = 0; i < TrackBtnsNodeList.length; i++) {
        TrackBtns.push(TrackBtnsNodeList[i]);
    }


    /**
     * input radios
     */
    var RadioAnswers = document.querySelectorAll("input[name='Answer']");
    // console.log(RadioAnswers);

    /**
     * this is userAnswersSession
     */
    var userAnswersSession = [];
    var UserOptionSession = {};
    UserOptionSession.QuestId = "";
    UserOptionSession.Answer = "";


    // userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];
    // localStorage.clear(); check

    /**
     * load Ddata to localStorage
     */


    if (!sessionStorage.getItem("firstRun")) {
        var RandomNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var i = 0; i < RandomNumbers.length; i++) {
            var RandomIndex = Math.floor(Math.random() * RandomNumbers.length);;
            var temp = RandomNumbers[i];
            RandomNumbers[i] = RandomNumbers[RandomIndex];
            RandomNumbers[RandomIndex] = temp;
        }
        sessionStorage.setItem("RandomNumbers", JSON.stringify(RandomNumbers));
        sessionStorage.setItem("firstRun", "true");
    }


    var RandomNumbers = JSON.parse(sessionStorage.getItem("RandomNumbers"));
    // console.log(RandomNumbers);

    var Questions = [
        {
            Head: " What does HTML stand for?",
            A: "A) Hyper Tool Markup Language",
            B: "B) Hyper Text Markup Language",
            C: "C) High Text Machine Language",
            D: "D) Hyperlinks Text Mark Language",
            ID: 0,
            Answer: "B) Hyper Text Markup Language"
        },
        {
            Head: " Which tag is used for the largest heading in HTML?",
            A: "A) <h6>",
            B: "B) <head>",
            C: "C) <h1>",
            D: "D) <title>",
            ID: 1,
            Answer: "C) <h1>"
        },
        {
            Head: " Which property is used to change text color in CSS?",
            A: "A) font-style",
            B: "B) text-color",
            C: "C) color",
            D: "D) background-color",
            ID: 2,
            Answer: "C) color"
        },
        {
            Head: " Which CSS property is used to make text bold?",
            A: "A) font-weight",
            B: "B) font-size",
            C: "C) text-decoration",
            D: "D) bold",
            ID: 3,
            Answer: "A) font-weight"
        },
        {
            Head: " Which symbol is used for an ID selector in CSS?",
            A: "A) .",
            B: "B) #",
            C: "C) *",
            D: "D) &",
            ID: 4,
            Answer: "B) #"
        },
        {
            Head: " Which symbol is used for a class selector in CSS?",
            A: "A) #",
            B: "B) .",
            C: "C) @",
            D: "D) $",
            ID: 5,
            Answer: "B) ."
        },
        {
            Head: " What does JS stand for?",
            A: "A) Java Source",
            B: "B) JavaScript",
            C: "C) Just Script",
            D: "D) JSON Script",
            ID: 6,
            Answer: "B) JavaScript"
        },
        {
            Head: " Which keyword is used to declare a variable in JavaScript?",
            A: "A) int",
            B: "B) var",
            C: "C) string",
            D: "D) float",
            ID: 7,
            Answer: "B) var"
        },
        {
            Head: " What will console.log(2 +'2') output?",
            A: "A) 4",
            B: "B) 22",
            C: "C) error",
            D: "D) NaN",
            ID: 8,
            Answer: "B) 22"
        },
        {
            Head: " Which HTML attribute is used to link a CSS file?",
            A: "A) src",
            B: "B) href",
            C: "C) link",
            D: "D) style",
            ID: 9,
            Answer: "B) href"
        }
    ];
    if (!localStorage.getItem("Questions")) {
        localStorage.setItem("Questions", JSON.stringify(Questions));
    }

    for (var j = 0; j < Questions.length; j++) {
        Questions[j].ID = RandomNumbers[j];
    }

    Questions.sort(function (a, b) {
        return a.ID - b.ID;
    })


    for (var k = 0; k < Questions.length; k++) {
        Questions[k].Head = (k + 1) + Questions[k].Head;
    }
    sessionStorage.setItem("Questions", JSON.stringify(Questions));

    var QuestionsCopy;
    if (!sessionStorage.getItem("QuestionsCopy")) {
        // console.log(QuestionsCopy);
        QuestionsCopy = JSON.parse(sessionStorage.getItem("Questions")) || [];
        for (var i = 0; i < QuestionsCopy.length; i++) {
            QuestionsCopy[i].Hold = false;
        }
        sessionStorage.setItem("QuestionsCopy", JSON.stringify(QuestionsCopy));
    }
    // console.log(Questions)


    // console.log(QuestionHead); check
    // console.log(AnswerOptions); check

    /**
     * load first Questions
     */


    // console.log(typeof Questions[0].Head); check

    QuestionHead.textContent = Questions[0].Head;
    QuestionId.textContent = Questions[0].ID;
    AnswerOptions[0].textContent = Questions[0].A;
    AnswerOptions[1].textContent = Questions[0].B;
    AnswerOptions[2].textContent = Questions[0].C;
    AnswerOptions[3].textContent = Questions[0].D;

    // console.log(QuestionHead.textContent); check
    // console.log(AnswerOptions[0]); check


    //Previous button implementation


    // console.log(PrevousBtn) check
    PrevousBtn.addEventListener("click", function () {
        // get CurrentIndex
        var CurrentIndex = parseInt(QuestionId.textContent);
        // console.log(QuestionId.textContent);

        if (CurrentIndex > 0) {
            QuestionHead.textContent = Questions[CurrentIndex - 1].Head;
            QuestionId.textContent = Questions[CurrentIndex - 1].ID;
            AnswerOptions[0].textContent = Questions[CurrentIndex - 1].A;
            AnswerOptions[1].textContent = Questions[CurrentIndex - 1].B;
            AnswerOptions[2].textContent = Questions[CurrentIndex - 1].C;
            AnswerOptions[3].textContent = Questions[CurrentIndex - 1].D;
        }
        //check for answer
        userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];

        for (var x = 0; x < RadioAnswers.length; x++) {
            RadioAnswers[x].checked = false;
        }
        for (var i = 0; i < userAnswersSession.length; i++) {

            if (userAnswersSession[i].QuestId == (CurrentIndex - 1)) {

                for (var j = 0; j < AnswerOptions.length; j++) {
                    if (AnswerOptions[j].textContent == userAnswersSession[i].Answer) {

                        RadioAnswers[j].checked = true;
                    }
                }
                break;
            }
        }
    })

    //Next Button implementation

    // console.log(NextBtn); //check
    NextBtn.addEventListener("click", function () {
        // get CurrentIndex
        var CurrentIndex = parseInt(QuestionId.textContent);
        // console.log(QuestionId.textContent);

        if (CurrentIndex < Questions.length - 1) {
            QuestionHead.textContent = Questions[CurrentIndex + 1].Head;
            QuestionId.textContent = Questions[CurrentIndex + 1].ID;
            AnswerOptions[0].textContent = Questions[CurrentIndex + 1].A;
            AnswerOptions[1].textContent = Questions[CurrentIndex + 1].B;
            AnswerOptions[2].textContent = Questions[CurrentIndex + 1].C;
            AnswerOptions[3].textContent = Questions[CurrentIndex + 1].D;
        }
        //check for answer
        userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];

        for (var x = 0; x < RadioAnswers.length; x++) {
            RadioAnswers[x].checked = false;
        }
        for (var i = 0; i < userAnswersSession.length; i++) {

            if (userAnswersSession[i].QuestId == (CurrentIndex + 1)) {

                for (var j = 0; j < AnswerOptions.length; j++) {
                    if (AnswerOptions[j].textContent == userAnswersSession[i].Answer) {

                        RadioAnswers[j].checked = true;
                    }
                }
                break;
            }
        }
    })


    /**
     * Question Track Questions implementation
     */


    //implement Question Track on Array
    TrackBtns.forEach(function (element, index) {
        element.addEventListener("click", function () {
            var CurrentIndex = parseInt(element.textContent) - 1;
            QuestionHead.textContent = Questions[CurrentIndex].Head;
            QuestionId.textContent = Questions[CurrentIndex].ID;
            AnswerOptions[0].textContent = Questions[CurrentIndex].A;
            AnswerOptions[1].textContent = Questions[CurrentIndex].B;
            AnswerOptions[2].textContent = Questions[CurrentIndex].C;
            AnswerOptions[3].textContent = Questions[CurrentIndex].D;

            userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];

            var ID = QuestionId.textContent;

            for (var x = 0; x < RadioAnswers.length; x++) {
                RadioAnswers[x].checked = false;
            }
            for (var i = 0; i < userAnswersSession.length; i++) {

                if (userAnswersSession[i].QuestId == (ID)) {

                    for (var j = 0; j < AnswerOptions.length; j++) {
                        if (AnswerOptions[j].textContent == userAnswersSession[i].Answer) {

                            RadioAnswers[j].checked = true;
                        }
                    }
                    break;
                }
            }
        })
    });



    /**
     * implementation of userAnswersSession in sessionStorage
     */
    // console.log(AnswerOptionsArrayBtns);//check


    AnswerOptionsArrayBtns.forEach(function (element) {
        element.addEventListener("click", function () {
            var ID = QuestionId.textContent;
            TrackBtns[parseInt(ID)].style.backgroundColor = "lightGreen";

            userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];

            if (userAnswersSession.length == 0) {
                UserOptionSession.QuestId = parseInt(ID);
                UserOptionSession.Answer = element.textContent;
                userAnswersSession.push(UserOptionSession);
            } else {
                var flagID = 0;
                for (var i = 0; i < userAnswersSession.length; i++) {
                    // console.log(userAnswersSession[i].QuestId);
                    if (ID == userAnswersSession[i].QuestId) {
                        userAnswersSession[i].Answer = element.textContent;
                        flagID = 1;
                        break;
                    }
                }
                if (flagID == 0) {
                    UserOptionSession.QuestId = parseInt(ID);
                    UserOptionSession.Answer = element.textContent;
                    userAnswersSession.push(UserOptionSession);
                }
            }

            sessionStorage.setItem("userAnswersSession", JSON.stringify(userAnswersSession));

        })
    })

    /**
     * Marked Questions
     */

    var HoldBtn = document.getElementById("HoldBtn");



    HoldBtn.addEventListener("click", function () {
        QuestionsCopy = JSON.parse(sessionStorage.getItem("QuestionsCopy"))
        var ID = QuestionId.textContent;

        QuestionsCopy[ID].Hold = true;
        if (TrackBtns[ID]) {
            TrackBtns[ID].style.backgroundColor = "orange";
        }
        sessionStorage.setItem("QuestionsCopy", JSON.stringify(QuestionsCopy));
    })




    /**
     * if there is areload happened
     */
    window.addEventListener("load", function () {
        QuestionsCopy = JSON.parse(sessionStorage.getItem("QuestionsCopy"));

        userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];

        userAnswersSession.forEach(function (element) {
            TrackBtns[parseInt(element.QuestId)].style.backgroundColor = "lightGreen";
        });


        for (var i = 0; i < QuestionsCopy.length; i++) {
            // TrackBtns[parseInt(element.ID)].style.backgroundColor="lightGreen";
            if (QuestionsCopy[i].Hold == true) {
                // console.log("hello")
                TrackBtns[parseInt(QuestionsCopy[i].ID)].style.backgroundColor = "orange";
            }
        }


        var ID = QuestionId.textContent;

        for (var x = 0; x < RadioAnswers.length; x++) {
            RadioAnswers[x].checked = false;
        }
        for (var i = 0; i < userAnswersSession.length; i++) {

            if (userAnswersSession[i].QuestId == (ID)) {

                for (var j = 0; j < AnswerOptions.length; j++) {
                    if (AnswerOptions[j].textContent == userAnswersSession[i].Answer) {

                        RadioAnswers[j].checked = true;
                    }
                }
                break;
            }
        }

    })



    //timer implementation
    var ExamTimer = document.getElementById("ExamTimer");

    // sessionStorage.removeItem("ExamTime");

    if (!sessionStorage.getItem("ExamTime")) {
        var duration = 10 * 60  *  1000;
        var endTime = Date.now() + duration;
        sessionStorage.setItem("ExamTime", endTime);
    }

    var endTime = parseInt(sessionStorage.getItem("ExamTime"));

    var Timer = setInterval(function () {
        let timeleft = endTime - Date.now();
        if (timeleft <= 0) {
            clearInterval(Timer);
            ExamTimer.textContent = "Time Out";
            TimeoutModal.classList.remove('hidden');
            TimeoutModal.classList.add('flex');
            submitAnswers();
        } else {
            var timeInSec = Math.ceil((timeleft) / 1000);
            var Seconds = Math.floor(timeInSec % 60);
            var Minutes = Math.floor(timeInSec / 60);
            if (Minutes < 10 && Seconds < 10) {
                ExamTimer.textContent = `0${Minutes}:0${Seconds}`;
            } else if (Minutes < 10 && Seconds > 10) {
                ExamTimer.textContent = `0${Minutes}:${Seconds}`;
            } else {
                ExamTimer.textContent = `${Minutes}:${Seconds}`;
            }
            let TimeoutModal = document.getElementById("TimeoutModal");
        }
    }, 1000)

    // var TimeoutModal = document.getElementById("TimeoutModal");
    // console.log(TimeoutModal);

    /**
     * submit condition 
    */

    const modal = document.getElementById('submitModal');
    const submitBtn = document.getElementById('SubmitBtn');
    const cancelBtn = document.getElementById('cancelSubmit');
    const confirmBtn = document.getElementById('confirmSubmit');


    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });


    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });


    confirmBtn.addEventListener('click', () => {
        submitAnswers();
        modal.classList.add('hidden');
    });


    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    function submitAnswers() {
        Questions = JSON.parse(sessionStorage.getItem("Questions"));
        userAnswersSession = JSON.parse(sessionStorage.getItem("userAnswersSession")) || [];
        console.log(userAnswersSession);
        console.log(Questions);
        var Result = 0;
        userAnswersSession.forEach(function (question) {
            if (Questions[question.QuestId].Answer == question.Answer) {
                Result++;
            }
            console.log(question.Answer);
            console.log(Questions[question.QuestId].Answer);
        })
        sessionStorage.setItem("Result", JSON.stringify(Result));
        setTimeout(() => {
            window.location.replace("../html/Result.html");
        }, 1000);
    }
}