<?php

// ******************************************************
// this script process a login request from the home page
// ******************************************************

// we need the SQL connectivity information from the config file
require_once('../config/config.php');

// get the user values form the POST array
$userEmail = $_POST['email'];
$userPassword = $_POST['password'];

// find a match in the database for user email and password
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$query = $pdo->prepare('SELECT userID, userType FROM PMSUsers WHERE email = :email AND password = :password;');
$query->execute(array(':email' => $userEmail, ':password' => $userPassword));
$result = $query->fetch(PDO::FETCH_ASSOC);

// no match was found => redirect back to login with invalid parameter
if ($result == false) {
    header('Location: ../index.php?renderInvalid=true');
}

// match was found => set up the session variable and redirect to dashboard
else {
    session_start();
    $_SESSION['userId'] = intval($result['userID']);
    $_SESSION['userType'] = $result['userType'];
    header('Location: ../calendar.php');
}

?>