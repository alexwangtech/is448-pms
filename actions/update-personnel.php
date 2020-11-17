<?php

// *************************************************************************
// updates the information for an existing personnel in the "PMSUsers" table
// *************************************************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the values from the POST array
$userId = $_POST['userId'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$department = $_POST['department'];
$userType = $_POST['userType'];
$email = $_POST['email'];

// prepare a query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("UPDATE PMSUsers
    SET firstName = :firstName, lastName = :lastName, departmentName = :department, userType = :userType, email = :email
    WHERE userId = :userId");
$result = $stmt->execute(array(
    ':firstName' => $firstName,
    ':lastName' => $lastName,
    ':department' => $department,
    ':userType' => $userType,
    ':email' => $email,
    ':userId' => $userId
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
}

?>