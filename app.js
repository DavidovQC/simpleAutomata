const gameBoard = document.querySelector('.game-board');

for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
        const square = document.createElement('div');
        square.setAttribute('row', i);
        square.setAttribute('col', j);        
        // square.classList.add('row'+String(i));
        // square.classList.add('col'+String(j));
        square.classList.add('cell')
        square.classList.add('dead')
        //square.addEventListener('click', switchState);
        gameBoard.append(square);
    }
}

const cells = document.querySelectorAll('.cell');

cells.forEach((square) => square.addEventListener('click', switchState));

function switchState(e){
    const clickedCell = e.target;
    const isLive = e.target.classList.contains('live');

    if(isLive){
        clickedCell.classList.remove('live');
        clickedCell.classList.add('dead');
    }

    else{
        clickedCell.classList.remove('dead');
        clickedCell.classList.add('live');
    }
}