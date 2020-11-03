<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'includes/bootstrap-scripts.php'?>
    <link rel="stylesheet" href="styles/styles.css">
    <meta charset="UTF-8">
    <title>Tasks</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <h1 class="display-4">My Tasks</h1>

        <div id="taskList"></div>
        <script src="js/tasklist.js"></script>
    </div>
</body>

</html>