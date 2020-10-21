const fieldElements = document.querySelectorAll(".board__item");
const panel = document.querySelector('.panel');
const button = document.querySelector('.reset');
const panelX=document.querySelector('.resultPanel__item--X');
const panelO=document.querySelector('.resultPanel__item--O');
const panelDraw=document.querySelector('.resultPanel__item--Draw');
const scoreReset=document.querySelector('.resetResult');
const games = document.querySelector('.resultPanel__item--Games')
const resetGames = document.querySelector('.resetGames')


let activePlayer;
let fields;
let gameActive;
let won;
let counterX=0;
let counterO=0;
let counterDraw=0;
let gamesCounter=0;

const setDefaults = () => {
    fields = ['', '', '', '', '', '', '', '', '']
    activePlayer = 'X';
    gameActive = true;
   
}

const startGame=()=> {
    gamesCounter%2===0?activePlayer==='X':activePlayer=='0'
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

const displayWinMessage = () => {
    panel.innerText = `Gratulacje ${activePlayer}, wygrałeś!!!`;
    won=activePlayer;
    resultPanelMessage();
}

const resultPanelMessage = () => {
    if (won ==='X'){
        panelX.innerText=`${++counterX}`
        games.innerText=`${gamesCounter+1}`
    }
    else if (won==='O'){
        panelO.innerText=`${++counterO}`
        games.innerText=`${gamesCounter+1}`
    }
}

const displayTieMessage = () => {
    panel.innerText= 'Remis!!!'
}

const isBoardFull = () => {
    return fields.find(field=>field==='') === undefined
}

const validateGame = () => {
    let gameWon=false;
    for (let i = 0; i <= 7; i++) {
        const [posA, posB, posC] = winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if (value1 !== '' && value1 === value2 && value1 === value3) {
            gameWon=true;
            break;
        }

    }
    if (gameWon){
        gameActive = false;
            displayWinMessage();
    }
    else if (isBoardFull()){
        gameActive=false;
        displayTieMessage();
        panelDraw.innerText=`${++counterDraw}`
        games.innerText=`${gamesCounter+1}`
    }
}


fieldElements.forEach(field => {
    field.addEventListener("click", e => {
        const {
            pos
        } = e.target.dataset;
        if (gameActive && fields[pos] === '') {
            fields[pos] = activePlayer;
            e.target.classList.add(`board__item--filled-${activePlayer}`);
            validateGame();
            activePlayer = activePlayer === 'X' ? 'O' : 'X'
        }
    })
})

const handleButtonClick = () => {
    setDefaults();
    fieldElements.forEach(field => {
        field.classList.remove('board__item--filled-X', 'board__item--filled-O')
    })
    panel.innerText='';
    startGame();


}

handleResetScore = ()=>{
    panelO.innerText='0';
    panelX.innerText='0';
    panelDraw.innerText='0'
}

handleGamesScoreReset = () => {
    games.innerText='0'
}


button.addEventListener('click', handleButtonClick)

scoreReset.addEventListener('click',handleResetScore)

resetGames.addEventListener('click',handleGamesScoreReset)


setDefaults();