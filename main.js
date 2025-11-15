
function mixcards() {
    const container = document.getElementById('gameboard');
    let cards = Array.from(container.children);

    console.log('Total cards before adjustment: ' + cards.length);
    cards = cards.splice(0, totalCards);
    console.log('Total cards after adjustment: ' + cards.length);

    container.innerHTML = "";

    for (let i = cards.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(cards[j]);
        cards.splice(j, 1);
    }

}

totalCards = 32;
selectedQuestions = [];
currentQuestionIndex = 0;
correctAnswersCount = 0;    
lastflipped = null;
allflipped = false;
turn = 0; 
playercount = 4;
score = new Array(playercount).fill(0);

function flipCard() {
    const card = this;
    const flipped = card.id; 
    console.log('Card clicked');
    if (card.classList.contains('flipped') || allflipped) {
        return; 
    }
    card.classList.toggle('flipped');  

    console.log(flipped.slice(0, 5));
    if (!lastflipped) {
        lastflipped = flipped;         
    } else if(lastflipped.slice(0, 6) == flipped.slice(0, 6)) {
        card.classList.add('player'+(turn+1));
        document.getElementById(lastflipped).classList.add('player'+(turn+1));
        samecard();
        score[turn] ++;
        updateScoreboard()
        lastflipped = null;
    } 
    else {
        allflipped = true;
        setTimeout(() => {
            console.log(card);
            console.log(document.getElementById(lastflipped));
            card.classList.remove('flipped');
            document.getElementById(lastflipped).classList.remove('flipped');
            notsamecard();
            lastflipped = null;
        allflipped = false;
        nextturn();
        }, 1500);

    }

}
function samecard() {
    console.log('richtig');
}
function notsamecard() {
    console.log('falsch');
}
 function nextturn (){
    turn ++;
    if (turn >= playercount){
        turn = 0;
    }
    console.log('Player turn: ' + turn);
    let color;
    switch (turn) {
        case 0:
            color = 'var(--player1-light)'; break;
        case 1:
            color = 'var(--player2-light)'; break;
        case 2:
            color = 'var(--player3-light)'; break;
        case 3:
            color = 'var(--player4-light)'; break;
    }
    document.body.style.backgroundColor = color;
 }

 function updateScoreboard() {
    let scoreBoard = "";
    for (let i = 0; i < playercount; i++) {
        scoreBoard += `<p ${i == turn ? "style='background-color:white;'" : ""}>Player ` + (i + 1) + ": " + score[i] + "</p> <br>";
    }
    document.getElementById('scoreValue').innerHTML = scoreBoard;
}
function setplayercount(count) { 
    playercount = count;
    console.log('Player count set to: ' + playercount);
}

function setDifficulty(level) {
    switch (level) {
        case 'easy':
            totalCards = 8; break;
        case 'medium':
            totalCards = 16; break;
        case 'hard':
            totalCards = 32; break;
    }
    console.log('Difficulty set to: ' + level + ' with ' + totalCards + ' cards.');
}

function startGame() {
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('game').style.display = 'block';
    document.getElementById('gameSelect').style.display = 'none';
    mixcards();
    updateScoreboard();
    nextturn();
}
