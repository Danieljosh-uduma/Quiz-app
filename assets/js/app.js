import { User, allQuestionsList, getAllQuestions, shuffleList } from './module/utils.js';
import { saveScore } from './module/firebase-db.js';

// for debugging
const log = (value) => console.log(value);

// constanst variables
let count = 0, qn,offset = 300, user;
const homePage = document.getElementById('homepage');
const quizPage = document.getElementById('quiz');
const userName = document.getElementById('name');
const form = document.getElementById('form');
const question = document.getElementById('quiz-question');
const options = document.getElementsByClassName('option');
const btn = document.getElementById('next-btn');
const questionNum = document.getElementById('question-number');
const progressBAr = document.getElementById('fg');


// display the question 
function displayQuestion(quiz) {
    
    question.innerHTML = quiz.question

    qn = count + 1;
    questionNum.innerHTML = qn;

    offset -= 30;
    progressBAr.style.strokeDashoffset = offset;

    let allOptions = [];
    quiz.incorrect_answers.forEach(element => {
        allOptions.push(element)
    });
    allOptions.push(quiz.correct_answer)

    shuffleList(allOptions)
    for (let i = 0; i < 4; i ++) {options[i].innerHTML = allOptions[i]}

    log(quiz.correct_answer)
}

// select option and check if it's correct 
function seclectOptions(correct_answer) {
    let trial = 1;
        if (trial) {
            for (let option of options){
                option.addEventListener('click', () => {
                    if (option.innerHTML == decodeEntities(correct_answer) && trial > 0){
                        option.classList.add('correct')
                        user.scoreIncrement()
                        log(user)
                        trial--;
                    }
                    else if (option.innerHTML != decodeEntities(correct_answer) & trial > 0) {
                        option.classList.add('wrong');
                    log(user)
                        if (option.innerHTML == correct_answer && trial > 0){
                            option.classList.add('correct')}
                        for (let option of options) {
                            if (option.innerHTML == correct_answer) {
                                option.classList.add('correct')
                            }
                        }
                        trial--;
                    }
                })
            }
        }
    }

// decode html entities 
function decodeEntities(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
}

// main even loop
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await getAllQuestions();

    user = new User(userName.value)
    
    homePage.style.display = 'none';
    quizPage.style.display = 'flex';

    // display questions and options 
    let quiz = allQuestionsList[count]

    displayQuestion(quiz);
    let correct_answer = quiz.correct_answer
    log(correct_answer)

    seclectOptions(correct_answer)
    btn.addEventListener('click', () => {
        if (count == 9 ) {
            saveScore(user)
            location.href = '/leaderboard.html'
        }
        else if (count <= 9) {
            count++;
            quiz = allQuestionsList[count]
            for (let option of options) {
                option.classList.remove('correct') || option.classList.remove('wrong')
            }

            displayQuestion(quiz)
            let correct_answer = quiz.correct_answer
            seclectOptions(correct_answer)
        }
    })





































    
//     while ( count < 10 ) {
//         displayQuestion(allQuestionsList[count])
//         let correct_answer = allQuestionsList[count].correct_answer
//         log(correct_answer)

        // let trial = 1;
        // if (trial) {
        //     for (let option of options){
        //         option.addEventListener('click', () => {
        //             if (option.innerHTML == decodeEntities(correct_answer) && trial > 0){
        //                 option.classList.add('correct')
        //                 user.scoreIncrement()
        //                 log(user)
        //                 trial--;
        //             }
        //             else if (option.innerHTML != decodeEntities(correct_answer) & trial > 0) {
        //                 option.classList.add('wrong');
        //             log(user)
        //             if (option.innerHTML == correct_answer && trial > 0){
        //                 option.classList.add('correct')}
        //             for (let option of options) {
        //                 if (option.innerHTML == correct_answer) {
        //                     option.classList.add('correct')
        //                 }
        //             }
        //             trial--;
        //         }
        //     })
        // }
//     }
// }
    
        
})

