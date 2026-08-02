<?php

require './../backend/database.php';

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8'/>
		<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
		<title>Project 2 - 15 Puzzle</title>
		<link rel='stylesheet' href='./styles.css'/>
	</head>
	<body>
		<header>
			<h1>15 Puzzle</h1><br>
			<div id='game-options'>
				<label for='difficulty'>Difficulty Level: </label>
				<select name='difficulty' id='difficulty'>
					<option value='1'>Easy</option>
					<option value='25'>Medium</option>
					<option value='40'>Hard</option>
				</select>
			</div>
		</header>
		<main id='game'>
			<section id='game-metrics'>
				<div id='timer'>Timer: 0s</div>
				<div id='move-counter'>Moves: 0</div>
			</section>
			<section id='game-board'>
				<div id='tile0' value='0' class='tile'></div>
				<div id='tile1' value='1' class='tile'></div>
				<div id='tile2' value='2' class='tile'></div>
				<div id='tile3' value='3' class='tile'></div>
				<div id='tile4' value='4' class='tile'></div>
				<div id='tile5' value='5' class='tile'></div>
				<div id='tile6' value='6' class='tile'></div>
				<div id='tile7' value='7' class='tile'></div>
				<div id='tile8' value='8' class='tile'></div>
				<div id='tile9' value='9' class='tile'></div>
				<div id='tile10' value='10' class='tile'></div>
				<div id='tile11' value='11' class='tile'></div>
				<div id='tile12' value='12' class='tile'></div>
				<div id='tile13' value='13' class='tile'></div>
				<div id='tile14' value='14' class='tile'></div>
				<div id='tile15' value='15' class='tile empty'></div>
			</section>
			<section id='game-buttons'>
				<div id='shuffle'>
					<button type='button' id='shuffle-button'>Shuffle</button>
				</div>
				<div id='reset'>
					<button type='button' id='reset-button'>Reset</button>
				</div>
			</section>
			<section id='win-screen' class='hidden'>
				<h1>You Win!</h1>
				<form action='./../backend/submission.php' method='post'>
					<span id='time-score'>Time: 0s</span>
					<span id='move-score'>Moves: 0</span><br>
					<label for='player-name'>Enter your name: </label><br>
					<input type='text' id='player-name' name='player-name'/><br>
					<input type='hidden' id='time-submission' name='player-time' value=''>
					<input type='hidden' id='move-submission' name='player-moves' value=''>
					<button type='submit' id='submission-button'>Submit</button>
				</form>
			</section>
		</main>
		<footer>
			<h1>Leaderboard</h1>
<?php
$stmt = $conn->prepare("
	SELECT * FROM players
");
if ($stmt->execute()) {
	echo "<script>console.log('Successly retrieving all entries from players')</script>";
}
else {
	echo "<script>console.log('Error: " . $stmt->error . "')</script>";
}
$result = $stmt->get_result();
while ( $player = $result->fetch_assoc() ) {
	print_r( $player );
	echo "<br>";
}
$stmt->close();
$conn->close();
?>
		</footer>
		<script src='script.js'></script>
	</body>
</html>