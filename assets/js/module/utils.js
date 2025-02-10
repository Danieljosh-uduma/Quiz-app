class User {
    constructor (username) {
        this.username = username;
        this.score = 0;
    }

    scoreIncrement () {
        this.score++;
    }
}

let allQuestionsList = []

// fecth questions 
async function getQuestion() {
    const url = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json.results;
    }
    catch (error) {
        console.error(error.message);
    }
}


async function getAllQuestions() {
    const questions = await getQuestion();
    allQuestionsList = questions
}

// shuffle options 
function shuffleList(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export {User, allQuestionsList, getAllQuestions, shuffleList}