<?php

$host = "localhost";
$user = "sluu5";
$pass = "sluu5";
$dbname = "sluu5";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo "Could not connect to server<br>";
    die("Connection failed: " . $conn->connect_error . "<br>");
} 
else {
    echo "<script>console.log('Connection established')</script>";
}

$sql = "
	CREATE TABLE IF NOT EXISTS players(
	id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	playerName VARCHAR(30) NOT NULL,
	playerTime INT(4) UNSIGNED NOT NULL,
	playerMoves INT(4) UNSIGNED NOT NULL)";

if ($conn->query($sql) === TRUE) {
	echo "<script>console.log('Table players created successfully')</script>";
}
else {
	echo "Error creating table: " . $conn->error;
}

?>