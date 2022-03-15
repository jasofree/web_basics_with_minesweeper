let cellRows = 8;
let cellColumns = 8;
let numberMinesRendered = 0;
let numberMinesDiscovered = 0;
let numberMinesToDiscover = 10;
let ratioMinesCells = Math.round(cellRows * cellColumns / numberMinesToDiscover);
const bombCharacter = '&#x1F4A3;';
const flagCharacter = '&#x1F6A9;';
const smilingCharacter = '&#x1F642;';
const pensiveCharacter = '&#x1F614;';
const gameCellsContainerNode = document.querySelector('#game_cells_container');
const gameProgressNode = document.querySelector('#game_progress');
for (let row = 0; row < cellRows; row++) {
    for (let column = 0; column < cellColumns; column++) {
        let cellNode = document.createElement("div");
        let randomBomb = Math.random() * (ratioMinesCells + 1 - 1) + 1;
        let areThereMinesLeft = numberMinesRendered < numberMinesToDiscover;
        let areThereSameOrMoreMinesLeftThanCellsLeft = areThereMinesLeft && ( numberMinesToDiscover - numberMinesRendered ) >= cellRows * cellColumns - ( cellColumns * row + column );
        let isBomb = areThereMinesLeft && (randomBomb <= 2 || areThereSameOrMoreMinesLeftThanCellsLeft);
        cellNode.classList.add('game_cell');
        cellNode.setAttribute('data-row', row);
        cellNode.setAttribute('data-column', column);
        cellNode.setAttribute('data-is-bomb', isBomb);
        if (isBomb) {
            // cellNode.textContent = 'B';
            numberMinesRendered++;
        }
        gameCellsContainerNode.appendChild(cellNode);
    }
}

function checkGameShouldBeFinished() {
    let numberCellsCleared = gameCellsContainerNode.querySelectorAll('.game_cell.cleared').length;
    return (numberMinesToDiscover === numberMinesDiscovered && numberCellsCleared + numberMinesToDiscover === cellRows * cellColumns);
};

function endGame() {
    gameCellsContainerNode.classList.add('game_over');
    gameProgressNode.querySelector('.state').classList.add('game_over');
};

function updateMinesDiscovered() {
    gameProgressNode.querySelector('.number_mines_discovered').textContent = new String(numberMinesDiscovered).padStart(3, "0");
};

function updateMinesToDiscover() {
    gameProgressNode.querySelector('.number_mines_to_discover').textContent = new String(numberMinesToDiscover).padStart(3, "0");
};

updateMinesDiscovered();
updateMinesToDiscover();

for (let row = 0; row < cellRows; row++) {
    for (let column = 0; column < cellColumns; column++) {
        let cellNode = gameCellsContainerNode.querySelector(`.game_cell[data-row='${row}'][data-column='${column}']`);
        if (cellNode.getAttribute('data-is-bomb') !== 'true') {
            let numberNeighborBombs = countNeighborBombs(row, column);
            cellNode.setAttribute('data-number-neighbor-bombs', numberNeighborBombs);
            // cellNode.textContent = numberNeighborBombs;
        }
    }
}

function countNeighborBombs(row, column) {
    let numberNeighborBombs = 0;
    for (let index_row = -1; index_row < 2; index_row++) {
        let neighbor_row = row + index_row;
        for (let index_column = -1; index_column < 2; index_column++) {
            if (index_row === 0 && index_column === 0) {
                continue;
            }
            let neighbor_column = column + index_column;
            if (neighbor_row > -1 && neighbor_row < cellRows && neighbor_column > -1 && neighbor_column < cellColumns) {
                let neighborNode = gameCellsContainerNode.querySelector(`.game_cell[data-row='${neighbor_row}'][data-column='${neighbor_column}']`);
                let isBomb = neighborNode.getAttribute('data-is-bomb') === 'true';
                if (isBomb) {
                    numberNeighborBombs++;
                }
            }
        }
    }
    return numberNeighborBombs;
};

function clickNeighborsNoBombs(row, column) {
    row = parseInt(row);
    column = parseInt(column);
    for (let index_row = -1; index_row < 2; index_row++) {
        let neighbor_row = row + index_row;
        for (let index_column = -1; index_column < 2; index_column++) {
            if (index_row === 0 && index_column === 0) {
                continue;
            }
            let neighbor_column = column + index_column;
            if (neighbor_row > -1 && neighbor_row < cellRows && neighbor_column > -1 && neighbor_column < cellColumns) {
                let neighborNode = gameCellsContainerNode.querySelector(`.game_cell[data-row='${neighbor_row}'][data-column='${neighbor_column}']`);
                let isBomb = neighborNode.getAttribute('data-is-bomb') === 'true';
                let isCleared = neighborNode.classList.contains('cleared');
                let numberNeighborBombs = parseInt(neighborNode.getAttribute('data-number-neighbor-bombs'));
                let withoutNeighborBombs = numberNeighborBombs === 0;
                if (!isBomb && !isCleared) {
                    neighborNode.click();
                    if (withoutNeighborBombs) {
                        clickNeighborsNoBombs(neighbor_row, neighbor_column);
                    }
                }
            }
        }
    }
};

document.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget && eventTarget.classList.contains("game_cell")) {
        const cellNode = eventTarget;
        const isBomb = cellNode.getAttribute('data-is-bomb') === 'true';
        if (isBomb) {
            cellNode.innerHTML = bombCharacter;
            endGame();
            gameProgressNode.querySelector('.state').innerHTML = pensiveCharacter;
        }
        else {
            cellNode.classList.add('cleared');
            const numberNeighborBombs = parseInt(cellNode.getAttribute('data-number-neighbor-bombs'));
            const iHaveNeighborBombs = numberNeighborBombs > 0;
            if (iHaveNeighborBombs) {
                cellNode.textContent = numberNeighborBombs;
            }
            if (checkGameShouldBeFinished()) {
                endGame();
            }
            else if (!iHaveNeighborBombs) {
                let row = cellNode.getAttribute('data-row');
                let column = cellNode.getAttribute('data-column');
                clickNeighborsNoBombs(row, column);
            }
        }
    }
});

document.addEventListener("contextmenu", (event) => {
	const eventTarget = event.target;
    if (eventTarget && eventTarget.classList.contains("game_cell")) {
		event.preventDefault();
        let cellNode = eventTarget;
        cellNode.classList.add('flagged');
        cellNode.innerHTML = flagCharacter;
        let isBomb = cellNode.getAttribute('data-is-bomb') === 'true';
        if (isBomb) {
            numberMinesDiscovered++;
            updateMinesDiscovered();
        }
        else {
            endGame();
            gameProgressNode.querySelector('.state').innerHTML = pensiveCharacter;
        }
	}
});