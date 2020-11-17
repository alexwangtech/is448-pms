<?php

// *******************************************************************
// this script is used for retrieving all rows from the PMSUsers table
// *******************************************************************

// we need the constants from the config file
require_once('../config/config.php');

// formulate the query and execute it
$pdo = new PDO($CONN_STRING, $USERNAME, $PASSWORD);
$pdostmt = $pdo->query('SELECT userId, firstName, lastName, departmentName, userType, email FROM PMSUsers;', PDO::FETCH_ASSOC);
$rows = $pdostmt->fetchAll();

echo json_encode($rows);

?>