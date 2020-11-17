<?php

// **********************************************************************
// this script is used for adding a new personnel into the PMSUsers table
// **********************************************************************

// we need the constants from the config file
require_once('../config/config.php');

// get the values from the POST array
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$department = $_POST['department'];
$userType = $_POST['userType'];
$email = $_POST['email'];
$password = $_POST['password'];

// prepare the new query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$stmt = $pdo->prepare("INSERT INTO PMSUsers (firstName, lastName, departmentName, userType, email, password)
    VALUES (:firstName, :lastName, :department, :userType, :email, :password);");
 $result = $stmt->execute(array(
    ':firstName' => $firstName,
    ':lastName' => $lastName,
    ':department' => $department,
    ':userType' => $userType,
    ':email' => $email,
    ':password' => $password
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