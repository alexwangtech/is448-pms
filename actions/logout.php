<?php

// *******************************************************
// this script process a logout request from the home page
// *******************************************************

// unset everything, destroy the session and redirect back to the login page
session_start();
$_SESSION = array();
session_destroy();
header('Location: ../index.php');

?>