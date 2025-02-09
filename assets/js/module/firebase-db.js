// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js"


const fisrtPlayer = document.getElementById('first')
const secondPlayer = document.getElementById('second')
const thirdPlayer = document.getElementById('third')


const firebaseConfig = {
    databaseURL: "https://quiz-app-niel-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "LeaderBoard")


export function saveScore(user) {
    push(referenceInDB, user)
}

onValue(referenceInDB,async function (snapshot) {
     const snapshotValues = await snapshot.val()
    const userList = Object.values(snapshotValues)
    // console.log(userList)
    const leaderboard = userList.sort((a, b) => b.score - a.score)
    console.log(leaderboard)
    console.log(leaderboard[0].username)
    // fisrtPlayer.textContent = leaderboard[0]
})