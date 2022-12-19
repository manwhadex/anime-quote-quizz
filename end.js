const username =document.getElementById("username");
const saveScoreBtn = document.getElementById("SaveScoreBtn");
const finalScore = document.getElementById("finalScore");

//on récupère la valeur du score
const mostRecentScore=localStorage.getItem('mostRecentScore');
finalScore.innerText=mostRecentScore;

//on crée une liste pour les highscores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


//on peut cliquer sur le btn save si il y a qql chose d'écrit
username.addEventListener("keyup",()=> {
    saveScoreBtn.disabled=!username.value;
});

saveHighScore = e =>{
    console.log("clicked");
    e.preventDefault();
    
    const score ={
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    // on trie la liste pour avoir les plus grands highscores et on garde que les 5 meilleurs
    highScores.sort((a,b)=>b.score - a.score);
    highScores.splice(5);
    
    localStorage.setItem("highScores",JSON.stringify(highScores))

    window.location.assign("/home.html")
}