import { saveScore } from "./module/firebase-db.js";
import {
    User,
    UserProps,
    allQuestionsList,
    getAllQuestions,
    shuffleList,
    Question
} from "./module/utils.js";

type Option = string[];

// for debugging
const log = (value: any) => console.log(value);

// constanst variables
const homePage = document.getElementById("homepage");
const quizPage = document.getElementById("quiz");
const userName = document.getElementById("name");
const form = document.getElementById("form");
const question = document.getElementById("quiz-question");
const options = document.getElementsByClassName("option");
const btn = document.getElementById("next-btn") as HTMLButtonElement;
const questionNum = document.getElementById("question-number");
const progressBAr = document.getElementById("fg");
const msg = document.getElementById("msg");
let count = 0,
    qn: number,
    offset = 300,
    user: UserProps;

// display the question
function displayQuestion(quiz: Question) {
    if (!question || !questionNum || !progressBAr) {
        log("Html elements not found");
        return;
    }
    question.innerHTML = quiz.question;

    qn = count + 1;
    questionNum.innerHTML = String(qn);

    offset -= 30;
    progressBAr.style.strokeDashoffset = String(offset);

    let allOptions: Option = [];
    quiz.incorrect_answers.forEach((element) => {
        allOptions.push(element);
    });
    allOptions.push(quiz.correct_answer);

    shuffleList(allOptions);
    for (let i = 0; i < 4; i++) {
        options[i].innerHTML = allOptions[i];
    }
}

// decode html entities
function decodeEntities(text: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}

// select option and check if it's correct
function seclectOptions(correct_answer: string) {
    // number of trial to answer a question
    let trial = 1;
    if (trial) {
        for (let option of options) {
            option.addEventListener("click", () => {
                if (
                    option.innerHTML == decodeEntities(correct_answer) &&
                    trial > 0
                ) {
                    option.classList.add("correct");
                    user.scoreIncrement();
                    trial--;
                    if (!btn) {
                        log("Html element not found");
                        return;
                    }
                    btn.disabled = false;
                    btn.classList.remove("disabled");
                } else if (
                    option.innerHTML != decodeEntities(correct_answer) &&
                    trial > 0
                ) {
                    option.classList.add("wrong");
                    if (option.innerHTML == correct_answer && trial > 0) {
                        option.classList.add("correct");
                    }
                    for (let option of options) {
                        if (option.innerHTML == correct_answer) {
                            option.classList.add("correct");
                        }
                    }
                    trial--;
                    if (!btn) {
                        log("Html element not found");
                        return;
                    }
                    btn.disabled = false;
                    btn.classList.remove("disabled");
                }
            });
        }
    }
}

// main even loop
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!msg || !userName || !homePage || !quizPage || !btn) {
            log("element not found")
            location.href = './index.html'
            return
        }
        msg.innerHTML = "loading...";

        // get questions
        await getAllQuestions();

        user = new User((userName as HTMLInputElement).value);
        homePage.style.display = "none";
        quizPage.style.display = "flex";

        // display questions and options
        let quiz = allQuestionsList[count];

        displayQuestion(quiz);
        let correct_answer = quiz.correct_answer;

        // select answer from options
        seclectOptions(correct_answer);

        // move to next question
        btn.addEventListener("click", () => {
            if (count == 9) {
                saveScore(user);
                location.href = "/leaderboard.html";
            } else if (count <= 9) {
                count++;
                quiz = allQuestionsList[count];
                if (!options) {
                    return
                }
                else {
                    for (let option of options) {
                        option.classList.remove("correct");
                        option.classList.remove("wrong");
                    }
                }
                btn.disabled = true;
                btn.classList.add("disabled");

                displayQuestion(quiz);
                let correct_answer = quiz.correct_answer;
                seclectOptions(correct_answer);
            }
        });
    });
}
