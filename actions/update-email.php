<?php

// *********************************************************
// given the userId and email, update the corresponding row
// in the "PMSUsers" table
// *********************************************************

// we need the constants from the config file
require_once('../config/config.php');

// retrieve the POST values
$userId = $_POST['userId'];
$email = $_POST['email'];

// create the query and execute it (returns boolean)
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("UPDATE PMSUsers SET email = :email WHERE userId = :userId;");
$result = $stmt->execute(array(':email' => $email, ':userId' => $userId));

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