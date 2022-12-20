const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const scoreText=document.getElementById('score');
const loader =document.getElementById("loader");
const game=document.getElementById("test");



let currentQuestion={};
let acceptingAnswers = false;
let score=0;
let questionCounter=0;
let availableQuestions=[];



let recap=[];
let questions =[];


fetch("https://animechan.vercel.app/api/quotes")
.then(res=>{return res.json()})
.then(loadedQuestions =>{
    questions=loadedQuestions.map(loadedQuestion =>{

        const incorrect_answer=["Bleach","Shigatsu Wa Kimi No Uso","Naruto","One Piece","Hanasaku Iroha",
            "Shingetsutan Tsukihime","Sakurasou no Pet na Kanojo","Fullmetal Alchemist","Death Note","CLANNAD",
            "Kyoukai No Kanata","Claymore","Rokka no Yuusha","Yu Yu Hakusho","Re:Zero kara Hajimeru Isekai Seikatsu",
            "One Punch Man","Wolf's Rain","Toriko","Samurai X: Trust & Betrayal","Nisekoi","Gintama","Psycho-Pass","Hellsing",
            "Assassination Classroom 2nd Season","Accel World","Jinrui wa Suitai Shimashita","Shingeki no Kyojin",
            "Kenichi: The Mightiest Disciple","Jormungand","Baka to Test to Shoukanjuu","Nisemonogatari","Ga-Rei:Zero","Bleach",
            "Durarara!!","Fairy Tail","SERVAMP",
            "Yahari Ore No Seishun Love Come Wa Machigatteiru","Angel Beats!","Soul Eater"]


        //on récupère les citations
        const formattedQuestion = {
            question: loadedQuestion.quote,
        };

        //on met les citations et les réponses dans le local storage
        recap.push({
            question:loadedQuestion.quote,
            anime: loadedQuestion.anime,
            character:loadedQuestion.character
        })
        

        const answerChoices =[]

        while(answerChoices.length<3){
        const answerIndex = Math.floor(Math.random()*incorrect_answer.length)
            if(loadedQuestion.anime!=incorrect_answer[answerIndex]){
                answerChoices.push(incorrect_answer[answerIndex]);
                incorrect_answer.splice(answerIndex,1);
            };
        };
        //on met la bonne réponse dans la liste au bon endroit choisi au hasard
        formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestion.anime);

        answerChoices.forEach((choice,index)=>{
            formattedQuestion["choice"+(index+1)]=choice;
        });

        return formattedQuestion
    });

    startGame();
})
.catch(err =>{
    console.error(err)
});





const CorrectBonus=10;
const max_questions=10;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[... questions];
    localStorage.setItem("recap",JSON.stringify(recap));
    getNewQuestion();
    
    //on ajoute les questions quand elles sont bien chargés
    game.classList.remove('hidden');
    loader.classList.add('hidden');

};

getNewQuestion=()=>{
    if(availableQuestions.length==0 || questionCounter==max_questions){
        //on récupère la valeur du score et on va a la page end
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign('/recap.html')
    }

    questionCounter++;
    questionCounterText.innerText=questionCounter + '/' + max_questions
    //Prends une question au bon ordre
    const questionIndex = 0;
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    //Mets les choix au bon endroit
    choices.forEach(choice=> {
        const number=choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+number];
    });


    //On retire la question qu'on vient de prendre
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers=true;
};


//on ajoute la fonctionnalité du click

choices.forEach(choice => {
    choice.addEventListener("click", e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice = e.target;

        // on obtient le nombre de la réponse sélectionnée
        const selectedAnswer =selectedChoice.dataset["number"];
    
        //on regarde si la réponse choisi est bonne
        let classToApply ='incorrect';
        if (selectedAnswer==currentQuestion.answer){
            classToApply='correct'
        }

        //on incrément le score de la valeur correctbonus
        if (classToApply==='correct'){
            incrementScore(CorrectBonus);
        }

        // on ajoute la class pour faire apparaitre la couleur verte ou rouge
    
        selectedChoice.parentElement.classList.add(classToApply);

        //puis on la retire apres un petit temps

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);

    });
});

incrementScore= num=>{
    score+=num;
    scoreText.innerText = score;
}

