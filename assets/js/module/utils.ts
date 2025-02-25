type UserProps = {
    username: string
    score: number
    scoreIncrement: () => void
}

type Question = {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

class User {
    username: string
    score: number

    constructor(username: string) {
        this.username = username;
        this.score = 0;
    }

    scoreIncrement() {
        this.score++;
    }
}

let allQuestionsList: Question[] = [];

// fecth questions
async function getQuestion() {
    const url =
        // "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
        // "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
        "https://opentdb.com/api.php?amount=10&category=21&type=multiple"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json.results;
    } catch (error: any) {
        console.error(error.message);
    }
}

async function getAllQuestions() {
    const questions = await getQuestion();
    allQuestionsList = questions;
}

// shuffle options
function shuffleList(array: string[]) {
    let currentIndex = array.length,
        randomIndex: number;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}

export { User, allQuestionsList, getAllQuestions, shuffleList, UserProps, Question };
