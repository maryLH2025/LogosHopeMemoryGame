  

window.onload = function() {
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach(card => card.addEventListener('click', flipCard));
    mixcards();
}
function mixcards() {
    const container = document.getElementById('gameboard');
    const cards = Array.from(container.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(cards[j]);
        cards.splice(j, 1);
    }
}
selectedQuestions = [];
currentQuestionIndex = 0;
correctAnswersCount = 0;    
lastflipped = null;
function flipCard() {
    const card = this;
    const flipped = card.id; 
     console.log('Card clicked');
        card.classList.toggle('flipped');  
    

    console.log(flipped.slice(0, 5));
    if (!lastflipped) {
        lastflipped = flipped;         
    } else if(lastflipped.slice(0, 5) == flipped.slice(0, 5)) {
        samecard();
        lastflipped = null;
    } else {
        setTimeout(() => {
            console.log(card);
            console.log(document.getElementById(lastflipped));
            card.classList.remove('flipped');
            document.getElementById(lastflipped).classList.remove('flipped');
            lastflipped = null;
            notsamecard();
        }, 1500);
    }

}
function samecard() {
    console.log('richtig');
}
function notsamecard() {
    console.log('falsch');
}