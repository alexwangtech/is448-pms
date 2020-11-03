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
        <div class="d-flex">
            <?php include 'components/calendar-component.php';?>
            <div id="tasksDiv" class="w-50 d-flex flex-column align-items-center"></div>
        </div>
    </div>
</body>

</html>