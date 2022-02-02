document.addEventListener('DOMContentLoaded', () => {
    let cellRows = 8;
    let cellColumns = 8;
    let gameCellsContainerNode = document.querySelector('#game_cells_container');
    for (let row = 0; row < cellRows; row++) {
        for (let column = 0; column < cellColumns; column++) {
            let cellNode = document.createElement("div");
            cellNode.classList.add('game_cell');
            cellNode.setAttribute('data-row', row);
            cellNode.setAttribute('data-column', column);
            gameCellsContainerNode.appendChild(cellNode);
        }
    }
}, false);