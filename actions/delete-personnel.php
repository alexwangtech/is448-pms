<?php

// *********************************************
// deletes a personnel from the "PMSUsers" table
// *********************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the values from the POST request
$userId = $_POST['userId'];

// prepare the query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("DELETE FROM PMSUsers WHERE userId = :userId");
$result = $stmt->execute(array(':userId' => $userId));

// boolean TRUE => successful query
if ($result == true) {
    $jsonArray = array('success' => 'true');
    echo json_encode($jsonArray);
}

// boolean FALSE => failed query
else {
    $jsonArray = array('success' => 'false');
    echo json_encode($jsonArray);
}

?>