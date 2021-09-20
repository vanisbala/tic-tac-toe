let matrixSize;
let cellCount;
let clickCount=0;
let gameState = [];
let currentPlayer = 'X';
let gameActive = true;
let checkWinMatrixSize;
const checkWinMatrix = [];
const winnerMessage = () => `Player - ${currentPlayer} has WON`
const drawMessage = () => 'Game ended in draw'
const currentPlayerMessage = () => `It's player - ${currentPlayer}'s turn`;

const statusMessageDisplayer = document.querySelector('.game-status');

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function createGameState(matrixSize , gameState) {
    for (let i = 0; i< matrixSize*matrixSize; i++){
        gameState[i] = "";
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusMessageDisplayer.innerHTML = currentPlayerMessage();

}

function checkWinner() {    
    let gameWon = false;
    let status = false;
    for(let i=0; i<checkWinMatrixSize; i++){
        let equalCount = 0;
        var compArray = [];
        for(let j=0; j<matrixSize; j++){ 
            compArray[j] = gameState[checkWinMatrix[i][j]];
        }
      
        if(compArray.indexOf("") !== -1) {
            console.log("loop continues");
            continue;
        }
       
        compArray.forEach( (value,index,array) => { 
            if (array[index] === array[index+1]) {
                console.log("elements equal" + index,array[index],array[index+1]);
                equalCount++;
            }
        });
        console.log("equal count:" + equalCount)

        if(equalCount === (matrixSize-1)){
            gameWon = true;
            console.log("value same?: " + gameWon);
            break;
        }
    }

    if (gameWon) {
        console.log("wooooooooooon")
        statusMessageDisplayer.innerHTML = winnerMessage();
        console.log("won");
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusMessageDisplayer.innerHTML = drawMessage();
        console.log("draw")
        gameActive = false;
        return;
    }
   changePlayer();   
}


function createCheckWinMatrix(matrixSize) {

    for (let i=0; i<checkWinMatrixSize; i++){
        checkWinMatrix[i] = [];
    }
    
    var cellValue = 0;
    for (let i = 0; i < matrixSize; i++){
        for (let j = 0; j < matrixSize; j++){
            checkWinMatrix[i][j] = cellValue++;
            
        }
    }
    cellValue = 0;
    for (let j = 0; j < matrixSize; j++){
        for (let i = matrixSize; i < (2 * matrixSize); i++){
            checkWinMatrix[i][j] = cellValue++;
        }
    }
    cellValue = 0;
    let i = (2*matrixSize);
    for ( let j = 0; j < matrixSize; j++){
        checkWinMatrix[i][j] = cellValue;
        cellValue = cellValue + matrixSize + 1;
    }
    i = (2*matrixSize)+1;
    cellValue = matrixSize - 1;
    for ( let j = 0; j < matrixSize; j++){
        checkWinMatrix[i][j] = cellValue;
        cellValue += (matrixSize-1); 
    }
   
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; //  console.log(clickedCell);
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));  // console.log("clickeccellindex",clickedCellIndex);    
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        console.log(clickedCellIndex);
        return;
    }
    console.log("calling cell played")
    cellPlayed(clickedCell, clickedCellIndex);
    checkWinner();
}

function getMatrixSize(event)  {
    matrixSize = parseInt(event.target.value); 
    cellCount = matrixSize * matrixSize;
    checkWinMatrixSize = (2 * matrixSize) + 2;
    createGameState(matrixSize, gameState);
    createMatrix(cellCount)
    createCheckWinMatrix(matrixSize);
    statusMessageDisplayer.innerHTML = currentPlayerMessage();    
} 

function createMatrix(matSize) {
    document.getElementById('matrix').style.setProperty('grid-template-columns','repeat('+ matrixSize +',auto)'); 
    for (let i=0; i < matSize; i++){
        let div = document.createElement('div');
        div.setAttribute('id',i.toString());
        div.setAttribute('class','cell')
        document.getElementById('matrix').appendChild(div);
    }
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click',cellClick)); 
}

function gameRestart() {
    gameActive = true;
    currentPlayer = "X";
    createGameState(matrixSize , gameState);
    statusMessageDisplayer.innerHTML = currentPlayerMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


window.onload =  start();

function start() {
    var matrixSizeInput = document.querySelector(".matrix-size-input");   
    matrixSizeInput.addEventListener("input", getMatrixSize);  
    document.querySelector('.game-restart').addEventListener('click',gameRestart);
}




