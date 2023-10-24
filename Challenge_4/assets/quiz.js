console.log("hello")
// Object for question, answer, true/false
const questions = [ // array of objects
    {
        // question 0
        question: "What is an array in JavaScript?",
        answers: ["1. strings", "2.const words = ['hello', 'world', 'welcome']", "3. alerts", "4. variables"],
        correctAnswer: "1"
    },
    {
        // question 1
        question: "What is a function in JavaScript?",
        answers: ["1. a string", "2. a set of statements that performs a task or calculates a value", "3. X", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "0"
    },
    {
        // question 3
        question: "What does this "==="  mean in JavaScript?",
        answers: ["1. to comment out code", "2. end a string", "3. quotes", "4. Equal value "],
        correctAnswer: "3"
    },
    {
        // question 4
        question: "A function used for writing out something",
        answers: ["1. console.log", "2. terminal", "3. for loops", "4. <script>"],
        correctAnswer: "1"
    }
];
const initialselement=document.querySelector("#initials")
const submitScrBtn=document.querySelector("#submit-score")
const goBackBtn=document.querySelector("#goBack")
const questionEl=document.querySelector("#question")
const ans1Btn=document.querySelector("#answer1")
const ans2Btn=document.querySelector("#answer2")
const ans3Btn=document.querySelector("#answer3")
const ans4Btn=document.querySelector("#answer4")
const timeEl=document.querySelector(".time")
const p=document.querySelector("#yaynay")
const finalEl=document.querySelector("#final")
const scoreListEl=document.querySelector(".score")
const highscoresEl=document.querySelector("#score-list")
const finalScoreEl=document.querySelector("#score")
const viewScoresBtn=document.querySelector("#view-scores")


let score=0


const introEl=document.querySelector("#start")
const questionsEl=document.querySelector("#questions")
let secondsLeft=75
// Functions
//if question 0 button = 2 then show question 1

// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`

        if (secondsLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            storeScores();
            displayScores();
            finalScoreEl.textContent = `Your final score is points: ${score} time:${secondsLeft}`;
            //scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// start quiz with timer and set up questions
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);

}

//function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    
    }
}

// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();
    p.style.display = 'block'
;



    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);
    console.log(questions[questionCount].correctAnswer, event.target.value);
    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        
        p.textContent = "Correct!";
        score+=10
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 5;
        p.textContent = "Wrong!";
    }
// Add to local storage

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialselement.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });
}

  

    
   


function storeScores() {
    let scoreList = JSON.parse(localStorage.getItem("scoreList")) || []
    let initials=initialselement.value.trim()
    let userScore={
initials:initials,
score:score
    }
    scoreList.push(userScore)
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    scoreListEl.innerHTML="";
    for (let i = 0; i < storedScoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${storedScoreList[i].initials}: ${storedScoreList[i].score}`;
        scoreListEl.append(li);
    }

    // If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";

}
// Clear the scores
const clearScrBtn=document.querySelector("#clearscores")
const startBtn=document.querySelector("#start")
const ansBtn=document.querySelectorAll(".ansBtn")
const viewScrBtn=document.querySelector("#view-scores")

clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";

    }
});

// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function(){
        highscoresEl.style.display = "none";
        introEl.style.display = "block";

        secondsLeft = 75;
        timeEl.textContent = `Time:${secondsLeft}s`;
        questionCount = 0;

     })
     viewScoresBtn.addEventListener("click", function(event){
        event.preventDefault();
        const quickHighScores=JSON.parse(localStorage.getItem("scoreList"))||[]
        quickHighScores.forEach(function(score){
            const li=document.createElement("li")
            li.textContent=`${score.initials} : ${score.score}`
            const quickScoresEl=document.querySelector("#quickScores")
            quickScoresEl.appendChild(li)
            setTimeout(function(){
                quickScoresEl.removeChild(li)
            },2000)
        })
     })

