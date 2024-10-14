const gameBoard = document.querySelector('.game-board');
const gameData = [];
//game board is dim x dim 
const res = 400;
const dim = 20;
const time = 250;

for(let i = 0; i < dim; i++){
    //set up ith row to be empty
    gameData[i] = [];
    
    for(let j = 0; j < dim; j++){
        //make a div element
        const square = document.createElement('div');
        //set its row and column
        square.setAttribute('row', i);
        square.setAttribute('col', j);        
        //set it to class cell
        square.classList.add('cell')
        //they start off dead
        square.classList.add('dead')
        //add it to the gameboard
        gameBoard.append(square);
        
        //set i,jth element to be 0 (dead)
        gameData[i][j] = 0;
    }
}
//get all cells
const cells = document.querySelectorAll('.cell');

//add an event listener to each cell so that they change state
cells.forEach((square) => {
    square.addEventListener('click', switchState)
    //set height and width of all cells.
    square.style.width = String(res/dim) + "px";
    square.style.height = String(res/dim) + "px";

});
//switch state function, turns live cells dead, dead cells live,
//updates the gameData matrix

function switchState(e){
    const clickedCell = e.target;
    const isLive = e.target.classList.contains('live');
    
    let r = Number(clickedCell.getAttribute('row'));
    let c = Number(clickedCell.getAttribute('col'));

    if(isLive){
        clickedCell.classList.remove('live');
        clickedCell.classList.add('dead');
        gameData[r][c] = 0;
        console.log(gameData);
    }

    else{
        clickedCell.classList.remove('dead');
        clickedCell.classList.add('live');
        gameData[r][c] = 1;
        console.log(gameData);
    }
}


function numberOfNeighborsAt(r, c){
    let count = 0;
    
    if(r+1 < dim){
        for(let i =-1; i < 2; i++){
            if(gameData[r+1][c+i] == 1){
                count++;
            }
        }
    }

    
    if(gameData[r][c+1] == 1){
        count++;
    }

    if(gameData[r][c-1] == 1){
        count++
    }

    if(-1<r-1){
        for(let i=-1; i< 2; i++){
            if(gameData[r-1][c+i] == 1){
                count++;
            }
        }
    }

    return count;
}

function generateNeighborBoard(){
    let neighborBoard = [];
    for(let i = 0; i < dim; i++){
        neighborBoard[i] = [];
        for(let j = 0; j < dim; j++){
            neighborBoard[i][j] = numberOfNeighborsAt(i, j);
        }
    }
    return neighborBoard;
}

function generateNextFrame(neighborBoard){
    let nextFrame = [];
    for(let i = 0; i < dim; i++){
        nextFrame[i] = [];
        for(let j = 0; j < dim; j++){
            if(gameData[i][j] == 1){
                if(neighborBoard[i][j] == 2 || neighborBoard[i][j] == 3){
                    nextFrame[i][j] = 1;
                }

                else{
                    nextFrame[i][j] = 0;
                }
            }
            else{
                if(neighborBoard[i][j] == 3){
                    nextFrame[i][j] = 1;
                }

                else{
                    nextFrame[i][j] = 0;
                }
            }
        }
    }

    return nextFrame;
}

function setNewDataBoard(nextFrame){
    for(let i = 0; i < dim; i++){
        for(let j = 0; j < dim; j++){
            gameData[i][j] = nextFrame[i][j];
        }
    }
}

function setCurrentState(cell){
    const r = cell.getAttribute('row');
    const c = cell.getAttribute('col');
    if(gameData[r][c] == 1){
        cell.classList.remove('dead');
        cell.classList.add('live');
    }

    else{
        cell.classList.remove('live');
        cell.classList.add('dead');
    }

}

function updateGameBoard(){
    cells.forEach((cell) => setCurrentState(cell));
}

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', renderNextFrame);

function renderNextFrame(){
    const neighborBoard = generateNeighborBoard();
    // console.log("neighbor board:")
    // console.log(neighborBoard);
    const nextFrame = generateNextFrame(neighborBoard);
    setNewDataBoard(nextFrame);
    console.log("game data:")
    console.log(gameData);
    updateGameBoard();
}

const playButton = document.getElementById('play-button');
playButton.addEventListener('click', play);
let paused = true;

const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', pause);


function play() {
    if (!paused) return; // If already playing, do nothing
    paused = false;
    intervalId = setInterval(renderNextFrame, time); // 1000ms delay (1 second per frame)
}

function pause() {
    paused = true;
    clearInterval(intervalId); // Stop the interval loop
    console.log('paused');
}

// function play(){
//     paused = false
//     renderNextFrame();
//     paused = false;
//     while(!paused){
//         setTimeout(renderNextFrame, 10000);
//     }
// }

// function pause(){
//     paused = true;
//     console.log('paused');
// }
