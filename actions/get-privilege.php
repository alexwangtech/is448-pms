<?php

// ***********************************************************************
// This script is for retrieving the userType, for rendering/functionality
// in the Personnel Table component.
// ***********************************************************************

session_start();

// Since we have data stored in the SESSIon, we can just directly 
// return the userType
echo $_SESSION['userType'];

?>