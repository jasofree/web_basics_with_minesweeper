document.addEventListener('DOMContentLoaded', () => {
    let cellRows = 8;
    let cellColumns = 8;
    let numberMinesToDiscover = 10;
    let ratioMinesCells = Math.round(cellRows * cellColumns / numberMinesToDiscover);
    let gameCellsContainerNode = document.querySelector('#game_cells_container');
    for (let row = 0; row < cellRows; row++) {
        for (let column = 0; column < cellColumns; column++) {
            let cellNode = document.createElement("div");
            let randomBomb = Math.random() * (ratioMinesCells + 1 - 1) + 1;
            let isBomb = randomBomb <= 2;
            cellNode.classList.add('game_cell');
            cellNode.setAttribute('data-row', row);
            cellNode.setAttribute('data-column', column);
            cellNode.setAttribute('data-is-bomb', isBomb);
            if (isBomb) {
                cellNode.textContent = 'B';
            }
            gameCellsContainerNode.appendChild(cellNode);
        }
    }
}, false);