document.addEventListener('DOMContentLoaded', () => {
    let cellRows = 8;
    let cellColumns = 8;
    let numberMinesRendered = 0;
    let numberMinesToDiscover = 10;
    let ratioMinesCells = Math.round(cellRows * cellColumns / numberMinesToDiscover);
    let gameCellsContainerNode = document.querySelector('#game_cells_container');
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
                cellNode.textContent = 'B';
                numberMinesRendered++;
            }
            gameCellsContainerNode.appendChild(cellNode);
        }
    }
}, false);