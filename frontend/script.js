const difficulty = document.getElementById('difficulty');
const gameTimer = document.getElementById('timer');
const moveCounter = document.getElementById('move-counter');
const gameBoard = document.getElementById('game-board');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');

const allTiles = document.querySelectorAll('.tile');
allTiles.forEach( tile => {
	tile.addEventListener('click', function () {
		console.log('click');
	})
})

const tilesById = [];
for( let i = 0; i < 16; i++ ) {
	const tileById = document.getElementById( `tile${i}` );
	tileById.style.backgroundPosition = 
		`-${100 * ( i % 4 ) } -${100 * Math.floor( i / 4 ) }`;
}
