<?php

// *****************************************************************
// gets all tasks from the "PMSTasks" table with the matching userId
// *****************************************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the userId from the GET request
$userId = $_GET['userId'];

// prepare the query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("SELECT * FROM PMSTasks WHERE userId = :userId;");
$stmt->execute(array(':userId' => $userId));
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// JSON encode the result and then send it back
echo json_encode($result);

?>