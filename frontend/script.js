let gameStart = false;

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
		console.log('click');
		moveTile( tile );
	})
})

const tilesById = [];
for( let i = 0; i < 16; i++ ) {
	const tileById = document.getElementById( `tile${i}` );
	tileById.style.backgroundPosition = 
		`-${100 * ( i % 4 ) } -${100 * Math.floor( i / 4 ) }`;
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
	if ( tile.className === 'empty' ) { return false; }
	const tiles = Array.from(gameBoard.children);
	const tileIndex = tiles.indexOf(tile);
	const emptyIndex = tiles.indexOf(empty)
	let tileCol = Math.floor( tileValue / 4 );
	let emptyValue = empty.value;
	let emptyRow = emptyValue % 4;
	let emptyCol = Math.floor( emptyValue / 4 );
	if ( ( Math.abs( tileRow - emptyRow ) === 1 && tileCol - emptyCol === 0 ) ||
		 ( Math.abs( tileCol - emptyCol ) === 1 && tileRow - emptyRow === 0 ) ) {
			return true;
		 }
	return false;
}

function isSolved() {
	for ( i = 0; i < 16; i++ ) {
		if ( allTiles[i].id != allTiles[i].value ) { return false ;}
	}
	return true;
}