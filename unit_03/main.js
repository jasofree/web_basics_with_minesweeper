let gameCellsContainerNode = document.querySelector('#game_cells_container');
for (let index = 0; index < 64; index++) {
    let cellNode = document.createElement("div");
    cellNode.classList.add('game_cell');
    gameCellsContainerNode.appendChild(cellNode);
}