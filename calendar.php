<?php

session_start();

// if the session 'userId' is not set, redirect back to the login page
if (!isset($_SESSION['userId'])) {
    header('Location: index.php');
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <?php include 'includes/bootstrap-scripts.php'?>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="icon" href="favicon.ico">
    <title>Calendar</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <div class="container-fluid m-0 p-0">
            <div class="row">
                <div class="col">
                    <div id="calendar"></div>
                </div>
                <div class="col">
                    <div id="tasksDiv"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/calendar.js"></script>
    <script>
    // use our PHP $_SESSION to set a userId value
    const userId = <?php echo $_SESSION['userId'];?>

    // create an instance of our Calendar component
    var calendar = new Calendar('calendar', userId);
    </script>
</body>

</html>