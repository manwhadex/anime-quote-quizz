const mode = document.getElementById("game-mode");

game_start = e =>{
    e.preventDefault();
    localStorage.setItem("game-mode",mode.value);
    window.location.assign('/game.html');
}

highscore = () =>{
    window.location.assign('/highscore.html')
}