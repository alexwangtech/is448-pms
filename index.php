<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'includes/bootstrap-scripts.php';?>
    <link rel="stylesheet" href="styles/styles.css">
    <meta charset="UTF-8">
    <title>Log In</title>
</head>

<body>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <h3 class="text-center">Portal</h3>
            <form action="calendar.php">
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