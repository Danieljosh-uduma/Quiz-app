// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";
import { UserProps } from "./utils";

const firstPlayer = document.getElementById("first");
const secondPlayer = document.getElementById("second");
const thirdPlayer = document.getElementById("third");
const playerList = document.getElementById("list");

const firebaseConfig = {
    databaseURL:
        "https://quiz-app-niel-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "LeaderBoard");

export function saveScore(user: UserProps) {
    push(referenceInDB, user);
}

type LeaderBoard = {
    username: string
    score: number
}
function render(value: LeaderBoard, elem: HTMLElement | null, position: string) {
    if (!elem) {
        console.log('element not found')
        return
    }
    elem.innerHTML = `<p id="${position}">${value.username}<span>${value.score}/10</span></p>`;
}

onValue(referenceInDB, async function (snapshot: any) {
    const snapshotValues = await snapshot.val();
    const userList: LeaderBoard[] = Object.values(snapshotValues);

    // sort the list
    const leaderboard = userList.sort((a, b) => b.score - a.score);

    // render top 3 players
    render(leaderboard[0], firstPlayer, "first");
    render(leaderboard[1], secondPlayer, "second");
    render(leaderboard[2], thirdPlayer, "third");

    // render rest players
    for (let user in leaderboard) {
        if (Number(user) > 2) {
            let player = leaderboard[user];
            if (playerList) {
                playerList.innerHTML += `
                <li>
                    <figure>
                        <span>${Number(user) + 1}</span>
                        <img src="/assets/images/profile4.jpg" alt="" class="img">
                        <figcaption>${player.username}</figcaption>
                    </figure>
                    <span>${player.score}/10</span>
                </li>
            `;
            }
        }
    }
});
