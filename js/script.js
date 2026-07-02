/*Variables*/
let currentIndex =0;
let vie = 3;
let tabBtn=[];
let tabReponse=[];
let idChrono;
let idTimeNext;
let maxQuestion = 0;
/*Récupération des boutons*/
const btnStart = document.getElementById("start-btn");
const btnNext = document.getElementById("next-btn");
const btnReplay = document.getElementById("replay-btn");
/***************************************/
/*Récupération des zones de texts*/
const txtScore = document.getElementById("score");
const txtSerie = document.getElementById("streak");
const txtCounter = document.getElementById("question-counter");
const txtTimerText=document.getElementById("timer-text");
const txtScoreFinal = document.getElementById("final-score");
/***************************************/
/*autres */
const zonrAcceuil = document.getElementById("screen-accueil");
const zoneGame = document.getElementById("screen-game");
const zonrFin = document.getElementById("screen-fin");
const zonequestion = document.getElementById("question-text");
const zonereponse = document.getElementById("answers");
const zonrLives = document.getElementById("lives");
const zonrTimer = document.getElementById("timer-bar");
const zoneRecap = document.getElementById("recap");
/*************************** */
/*Les questions*/
const questions = [
{
enonce: "Quel langage s'exécute nativement dans le navigateur ?",
options: { A: "Python", B: "JavaScript", C: "C#", D: "Java" },
correct: "B"
},
{
enonce: "Que renvoie typeof [] en JavaScript ?",
options: { A: "'array'", B: "'list'", C: "'object'", D: "'undefined'" },
correct: "C"
},
{
enonce: "Quelle méthode AJOUTE un élément à la fin d'un tableau ?",
options: { A: "push()", B: "pop()", C: "shift()", D: "slice()" },
correct: "A"
},
{
enonce: "Quel symbole introduit une fonction fléchée ?",
options: { A: "->", B: "=>", C: "::", D: "~>" },
correct: "B"
},
{
enonce: "Quelle boucle est faite pour parcourir les CLÉS d'un objet ?",
options: { A: "for...of", B: "forEach", C: "for...in", D: "while" },
correct: "C"
},
{
enonce: "Quelle fonction arrête un setInterval ?",
options: { A: "stopInterval()", B: "clearTimeout()", C: "clearInterval()", D: "killTimer()" },
correct: "C"
},
{
enonce: "event.target désigne…",
options: { A: "la fenêtre", B: "l'élément qui a déclenché l'événement", C: "le document", D: "le parent direct" },
correct: "B"
},
{
enonce: "Pour retirer un écouteur, removeEventListener exige…",
options: { A: "le même nom d'événement seulement", B: "n'importe quelle fonction", C: "la MÊME référence de fonction", D: "rien de spécial" },
correct: "C"
}
];

/*Gestion du chrono*/


const demarrerChrono = function(duree, onTick, onFin)
{
    clearInterval(idChrono); 
    let restant = duree;
    onTick(restant);                         
    idChrono = setInterval(() => {
        restant--;
        onTick(restant);                      
        if (restant <= 0) {
            clearInterval(idChrono);
            onFin();                          
        }
    }, 1000);
}



/************************************************ */
/*Fonctions*/
const afficherRecap= function()
{     zoneRecap.replaceChildren(); //équivalent de zoneRecap.innerHtml="";
    console.table(tabReponse);
    for (const [i, element] of questions.entries()) 
    {
        let li = document.createElement("li");
        li.classList.add("recap__item");
        let icon = document.createElement("i");
        icon.classList.add("fa-solid");

        let sspanenonce = document.createElement("span");
        let reponseUser = tabReponse.filter(c=>c.NumQuestion==i)[0];
        if(reponseUser!=undefined && reponseUser.isCorrect==1)
        {
            
            li.classList.add("recap__item--ok");
            
            icon.classList.add("fa-circle-check");

        }
        else
        {
            li.classList.add("recap__item--ko");
            if(reponseUser!=undefined)
            {
                icon.classList.add("fa-circle-xmark");
            }
            else
            {
                icon.classList.add("fa-hourglass");
            }
        }
        
        icon.classList.add("recap__icon");
        sspanenonce.classList.add("recap__q");
        sspanenonce.innerHTML =`${element.enonce} <br/>Réponse : ${element.options[element.correct]} `;
        li.appendChild(icon);
        li.appendChild(sspanenonce);
        zoneRecap.appendChild(li);
    }
}

const winOrLoose = function()
{
    zonrFin.classList.remove('is-hidden');
    zoneGame.classList.add('is-hidden');
    afficherRecap();
}

const afficherVie= function()
{   zonrLives.innerHTML="";
    for(let i = 0; i<3;i++)
    {
        const coeur = document.createElement("i");
        coeur.classList.add("fa-solid");         
        coeur.classList.add("fa-heart"); 
        
        if(i>vie-1)
        {            
            coeur.style.color="#ccc"; 
        }
        zonrLives.appendChild(coeur);
    }
}

const repondre = function(cle)
{
    clearInterval(idChrono);  //arrêter le chrono
    let selectedBtn=tabBtn.filter((b)=>b.dataset['key']===cle)[0];
    let inforeponse={
        "Reponse": cle,
        "NumQuestion": currentIndex,
        "BonneReponse":questions[currentIndex].correct
    }
    if(cle=== questions[currentIndex].correct)
    { 
        selectedBtn.classList.add("answer-btn--correct");
        //augmenter le score
        txtScore.innerText= parseInt(txtScore.innerText)+1;
        txtScoreFinal.innerText = parseInt(txtScore.innerText)+1;
        txtSerie.innerText = parseInt(txtSerie.innerText)+1;
        inforeponse.isCorrect=1;
    }
    else
    {  
        selectedBtn.classList.add("answer-btn--wrong");

        vie--;        
        inforeponse.isCorrect=0;        
        afficherVie(3);       
        txtSerie.innerText = 0;
    }
    tabReponse.push(inforeponse);
    removeBtnKeyListener();

    if(currentIndex==questions.length || vie==0)
    {
        winOrLoose();
    }
    else
    {
        btnNext.classList.remove('is-hidden');
        currentIndex++;
    }
    idTimeNext= setTimeout(nextQuestion,3000);

}

const keyResponse = function(e)
{
    
    let touche = e.key.toUpperCase();          // "A", "B", "C", "D"
    if(["A","B","C","D"].includes(touche)) repondre(touche);
    
}
const clickResponse= function(e)
{  
    repondre(e.currentTarget.dataset['key']);
}
const afficherBoutons = function(options)
{
    if(vie==0 || parseInt(txtCounter.innerText)+1 > maxQuestion) {winOrLoose();return;}
    tabBtn = [];  
    for (const key in options) {
        if (!Object.hasOwn(options, key)) continue;
        
        const element = options[key];
        let btn = document.createElement('btn');
        btn.classList.add("answer-btn");
        btn.dataset.key=key;
        let spanLetter = document.createElement("span");
        spanLetter.classList.add('answer-btn__key');
        spanLetter.textContent=key;
        let spanText = document.createElement("span");
        spanText.classList.add('answer-btn__text');
        spanText.textContent=element;
        btn.appendChild(spanLetter);
        btn.appendChild(spanText);
        tabBtn.push(btn);
        zonereponse.appendChild(btn);
        
    } 

    addBtnKeyListener();

}
const afficherQuestion= function(index)
{
    if(vie==0 || parseInt(txtCounter.innerText)+1 > maxQuestion) {winOrLoose();return;}
    zonequestion.innerHTML="";
    zonereponse.innerHTML="";
    let question =questions[index];
    for (const key in question) {         
        const element = question[key];
        if(key==='enonce')zonequestion.innerHTML=element;
        if(key==='options') afficherBoutons(element);
    }
    demarrerChrono(
        10,
        (restant) => {                             
            txtTimerText.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${restant}`;
            zonrTimer.style.width = (restant / 10 * 100) + "%";
        },
        () => {                                     
            vie--;
            afficherVie();
            removeBtnKeyListener();
            btnNext.classList.remove("is-hidden");
            //changer la couleur de la bonne réponse
            let correctBtn=tabBtn.filter((b)=>b.dataset['key']===questions[currentIndex].correct)[0];
            correctBtn.classList.add("answer-btn--timeup");           
            idTimeNext= setTimeout(nextQuestion,3000);
            txtSerie.innerText = 0;
            if(vie==0) winOrLoose();

        }
    );


    
}


/*Démarrage*/
const start = function(e)
{
    maxQuestion = questions.length;
    if(e.currentTarget=== btnReplay)
    {
        zonrFin.classList.add('is-hidden');
        vie=3;
        txtCounter.innerText=`0/${maxQuestion}`;
    }
    tabReponse=[];
    txtScoreFinal.innerText=0;
    txtScore.innerText=0;

    currentIndex=0;
    zonrAcceuil.classList.add("is-hidden");
    zoneGame.classList.remove("is-hidden");
    afficherVie(3);
    afficherQuestion(currentIndex);
}



/*Evénements*/
function removeBtnKeyListener()
{
    /*Ajout des événements sur les boutons*/
    tabBtn.forEach((current)=>
    {
        current.removeEventListener("click",clickResponse)
    });
    document.removeEventListener("keydown", keyResponse);
}
function addBtnKeyListener()
{   /*Ajout des événements sur les boutons*/
    tabBtn.forEach((current)=>
    {
        current.addEventListener("click",clickResponse, {once:true})
    });
    document.addEventListener("keydown", keyResponse, {once:true});
}
function nextQuestion()
{
    clearTimeout(idTimeNext);
    if(vie==0 || parseInt(txtCounter.innerText)+1 > maxQuestion) {winOrLoose();return;}
    afficherQuestion(currentIndex);
    btnNext.classList.add('is-hidden');
    let currentQuestion = parseInt(txtCounter.innerText)+1;
    txtCounter.innerText=`${currentQuestion}/${questions.length}` ;
}

btnStart.addEventListener("click",start);
btnReplay.addEventListener("click",start);
//Ne permet pas de refaire appel à la fonction lambda au besoin pour simuler le click suivant
// btnNext.addEventListener("click",()=>{
//     afficherQuestion(currentIndex);
//     btnNext.classList.add('is-hidden');
//     let currentQuestion = parseInt(txtCounter.innerText)+1;
//     txtCounter.innerText=`${currentQuestion}/${questions.length}` ;
// });

btnNext.addEventListener("click",nextQuestion);
