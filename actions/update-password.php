<?php

// ********************************************************
// given the 'userId' and 'password', update the "PMSUsers"
// table with the new given values
// ********************************************************

// get the constants from the config file
require_once('../config/config.php');

// get the POST values from the request
$userId = $_POST['userId'];
$password = $_POST['password'];

// prepare the query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("UPDATE PMSUsers SET password = :password WHERE userId = :userId;");
$result = $stmt->execute(array(':password' => $password, ':userId' => $userId));

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