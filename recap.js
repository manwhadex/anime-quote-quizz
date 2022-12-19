const animelist=document.getElementById("animelist");
const recap = JSON.parse(localStorage.getItem("recap")) || []

// comme si on rajoutait des lignes de codes html
animelist.innerHTML =
recap.map(score => {
    return `<li class="rec">${score.question} <div class="rec-character"> ${score.anime} - ${score.character} </div></li>`
})
.join("")
