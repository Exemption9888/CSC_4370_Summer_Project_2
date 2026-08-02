let gameStart = false;

const winner = Array.from( gameBoard.children );

const difficulty = document.getElementById('difficulty');
const gameTimer = document.getElementById('timer');
const moveCounter = document.getElementById('move-counter');
const gameBoard = document.getElementById('game-board');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');
const empty = document.querySelector('.empty');

const allTiles = document.querySelectorAll('.tile');
allTiles.forEach( tile => {
	tile.addEventListener('click', () => {
		moveTile( tile );
	})
})

const tilesById = [];
for( let i = 0; i < 16; i++ ) {
	const tileById = document.getElementById( `tile${i}` );
	tileById.style.backgroundPosition = 
		`-${100 * ( i % 4 ) }px -${100 * Math.floor( i / 4 ) }px`;
}

function moveTile( tile ) {
	if ( !isValid( tile ) ) { return; }
	const placeholder = document.createElement('div');
	tile.replaceWith(placeholder);
	empty.replaceWith(tile);
	placeholder.replaceWith(empty);
	isSolved();
}

function isValid( tile ) {
	if ( tile.classList.contains( 'empty' ) ) { return false; }

	const tiles = Array.from( gameBoard.children );
	const tileIndex = tiles.indexOf( tile );
	const emptyIndex = tiles.indexOf( empty )

	const tileRow = Math.floor( tileIndex / 4 );
	const tileCol = tileIndex % 4;
	
	const emptyRow = Math.floor( emptyIndex / 4 );
	const emptyCol = emptyIndex % 4;

	const rowDiff = Math.abs( tileRow - emptyRow );
	const colDiff = Math.abs( tileCol - emptyCol );

	const result = ( rowDiff === 1 && colDiff === 0 ) || ( rowDiff === 0 && colDiff === 1 );

	return result;
}

function isSolved() {
	const tiles = Array.from( gameBoard.children )
	for ( let i = 0; i < 16; i++ ) {
		if ( tiles[i].id != `tile${ i }` ) { return false; }
	}
	return true;
}

function incrementMoves () {
}

function resetGame() {
	for( let i = 0; i < 16; i++ ) {
		const tile = document.getElementById( `tile${ i }` );
		gameBoard.appendChild( tile );
	}
	moveCounter.innerHTML = 'Moves: 0';
	gameTimer.innerHTML = 'Timer: 0s';
}

resetButton.addEventListener( 'click', resetGame() );