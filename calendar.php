<!DOCTYPE html>
<html>

<head>

    <!-- Include Bootstrap Dependencies -->
    <?php include 'includes/bootstrap-scripts.php'?>

    <link rel="stylesheet" href="styles/styles.css">

    <title>Calendar</title>

</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <div id="calendar"></div>
    </div>
    <script src="js/calendar.js"></script>
</body>

</html>