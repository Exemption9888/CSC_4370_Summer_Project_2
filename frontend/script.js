let gameStart = false;
let movesMade = 0;
let timerInterval = null;
let seconds = 0;

const difficulty = document.getElementById('difficulty');
const gameTimer = document.getElementById('timer');
const moveCounter = document.getElementById('move-counter');
const gameBoard = document.getElementById('game-board');
const shuffleButton = document.getElementById('shuffle-button');
const resetButton = document.getElementById('reset-button');
const empty = document.querySelector('.empty');

const winScreen = document.getElementById('win-screen');
const winTime = document.getElementById('time-score');
const winMoves = document.getElementById('move-score');
const submissionButton = document.getElementById('submission-button');
const playerName = document.getElementById('player-name');

let gameDifficulty = difficulty.value;

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
	incrementMoves();
	const placeholder = document.createElement('div');
	tile.replaceWith(placeholder);
	empty.replaceWith(tile);
	placeholder.replaceWith(empty);
	if ( isSolved ) { solved(); }
}

function isValid( tile ) {
	if ( !gameStart ) { return false; }
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

function incrementMoves() {
	movesMade++;
	console.log(movesMade);
	moveCounter.textContent = `Moves: ${ movesMade }`;
}

function resetGame() {
	gameStart = false;
	stopTimer();
	for( let i = 0; i < 16; i++ ) {
		const tile = document.getElementById( `tile${ i }` );
		gameBoard.appendChild( tile );
	}
	moveCounter.textContent = 'Moves: 0';
	movesMade = 0;
	gameTimer.textContent = 'Timer: 0s';
}

function shuffle( n ) {
	gameStart = true;
	const tiles = Array.from( gameBoard.children );
	for ( let i = 0; i < n; i++ ) {
		const validMoves = [];
		tiles.forEach( item => {
			if ( isValid( item ) ) { validMoves.push( item ); }
		})
		const randomIndex = Math.floor( Math.random() * validMoves.length );
		const randomTile = validMoves[ randomIndex ];
		const placeholder = document.createElement( 'div' );
		randomTile.replaceWith( placeholder );
		empty.replaceWith( randomTile );
		placeholder.replaceWith( empty );
	}
	startTimer();
}

function startTimer() {
	stopTimer();
	seconds = 0;
	timerInterval = setInterval(() => {
		seconds++;
		gameTimer.textContent = `Timer: ${ seconds }s`;
	}, 1000 );
}

function stopTimer() {
	if ( timerInterval !== null ) {
		clearInterval( timerInterval );
		timerInterval = null;
	}
}

function solved() {
	const timeScore = seconds;
	const moveScore = movesMade;
	stopTimer();
	gameTimer.textContent = `Timer: ${ timeScore }s`;
	console.log("Solved");
}

resetButton.addEventListener( 'click', () => {
	resetGame();
})

shuffleButton.addEventListener( 'click', () => {
	shuffle( gameDifficulty );
})

difficulty.addEventListener( 'change', (event) => {
	gameDifficulty = difficulty.value;
})