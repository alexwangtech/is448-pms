<!DOCTYPE html>
<html>

<head>
    <!-- Include Dependencies -->
    <?php include 'includes/bootstrap-scripts.php'?>
    <link rel="stylesheet" href="styles/styles.css">

    <title>Tasks</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <h1>Tasks Page</h1>

        <div id="taskList"></div>
        <script src="js/tasklist.js"></script>
    </div>
</body>

</html>