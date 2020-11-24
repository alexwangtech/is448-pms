<?php

// ************************************************
// Updates an existing task in the "PMSTasks" table
// ************************************************

require_once('../config/config.php');

// Get the values from the POST array
$taskId = $_POST['taskId'];
$taskName = $_POST['taskName'];
$taskDueDate = $_POST['taskDueDate'];
$taskDescription = $_POST['taskDescription'];

// Prepare the new query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("UPDATE PMSTasks
    SET taskName=:taskName, taskDueDate=:taskDueDate, `description`=:taskDescription
    WHERE taskId=:taskId;");
$result = $stmt->execute(array(
    ':taskName' => $taskName,
    ':taskDueDate' => $taskDueDate,
    ':taskDescription' => $taskDescription,
    ':taskId' => $taskId
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