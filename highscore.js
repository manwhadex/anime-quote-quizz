const highScoresList = document.getElementById("highScoreList")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []


// comme si on rajoutait des lignes de codes html
highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
})
.join("")
