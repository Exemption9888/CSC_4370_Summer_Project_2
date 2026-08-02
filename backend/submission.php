<?php

require 'database.php';

$message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $playerName = trim($_POST['player-name'] ?? 'unknown');
  $playerTime = (int)($_POST['player-time'] ?? 0);
  $playerMoves = (int)($_POST['player-moves'] ?? 0);

  $stmt = $conn->prepare("INSERT INTO players (playername, playerTime, playerMoves) VALUES (?, ?, ?)");
  $stmt->bind_param('sii', $playerName, $playerTime, $playerMoves);

  if ($stmt->execute()) {
    $message = "<script>console.log('Record saved successfully')</script>";
  } else {
    $message = "<script>console.log('Error: ' . $stmt->error)</script>";
  }

  $stmt->close();
  

  header("Location: ./../frontend/index.php");

  exit();
}

header("Location: ./../frontend/index.php");
exit();