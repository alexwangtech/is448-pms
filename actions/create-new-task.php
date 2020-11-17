<?php

// ****************************************
// creates a new task in the PMSTasks table
// ****************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the values from the POST array
$userId = $_POST['userId'];
$taskName = $_POST['taskName'];
$taskDueDate = $_POST['taskDueDate'];
$taskDescription = $_POST['taskDescription'];

// prepare the query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("INSERT INTO PMSTasks (userId, taskName, taskDueDate, description)
    VALUES (:userId, :taskName, :taskDueDate, :taskDescription);");
$result = $stmt->execute(array(
    ':userId' => $userId,
    ':taskName' => $taskName,
    ':taskDueDate' => $taskDueDate,
    ':taskDescription' => $taskDescription
));

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