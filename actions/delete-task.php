<?php

// ****************************************
// deletes a task from the "PMSTasks" table
// ****************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the taskId from the POST request
$taskId = $_POST['taskId'];

// prepare a statement and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("DELETE FROM PMSTasks WHERE taskId = :taskId;");
$result = $stmt->execute(array(':taskId' => $taskId));

// boolean TRUE => successful query
if ($result == true) {
    $jsonArray = array('success' => 'true');
    echo json_encode($jsonArray);
}

// boolean FALSE => failed query
else {
    $jsonArray = array('success' => 'false');
    echo json_encode($jsonArray);
    //echo json_encode($stmt->errorInfo());
}

?>