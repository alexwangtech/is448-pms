<?php

session_start();

// if the session 'userId' is already set, redirect to the calendar page
if (isset($_SESSION['userId'])) {
    header('Location: calendar.php');
    exit();
}

// retrieve the GET 'renderInvalid' parameter (if exists)
if (isset($_GET['renderInvalid'])) {
    $renderInvalid = $_GET['renderInvalid'] == 'true' ? true : false;
} else {
    $renderInvalid = false;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <?php include 'includes/bootstrap-scripts.php';?>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="icon" href="favicon.ico">
    <title>Log In</title>
</head>

<body>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <h3 class="text-center">Portal</h3>
            <!-- Optionally render the invalid alert (based on $renderInvalid) -->
            <?php
            if ($renderInvalid == true) {
                echo '<div class="alert alert-danger" role="alert">Incorrect username or password.
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>';
            }
            ?>
            <form action="actions/login.php" method="POST">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email Address"
                        required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                        required>
                </div>
                <button type="submit" class="btn btn-dark w-100 text-center">Login</button>
            </form>
        </div>
    </div>
</body>

</html>