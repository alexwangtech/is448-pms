<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'includes/bootstrap-scripts.php';?>
    <link rel="stylesheet" href="styles/styles.css">
    <meta charset="UTF-8">
    <title>About You</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col">
                    <h1 class="mb-4">About You</h1>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h4>First Name</h4>
                    <input class="form-control" value="Alexander" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h4>Last Name</h4>
                    <input class="form-control" value="Wang" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h4>Department Name</h4>
                    <input class="form-control" value="Software Development" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h4>Email</h4>
                    <input type="email" class="form-control" value="alex915979wang@gmail.com" disabled>
                </div>
                <div class="col-1 d-flex align-items-end">
                    <button type="button" class="btn btn-outline-info">Change</button>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <h4>Password</h4>
                    <input type="password" class="form-control" value="password" disabled>
                </div>
                <div class="col-1 d-flex align-items-end">
                    <button type="button" class="btn btn-outline-info">Change</button>
                </div>
            </div>
        </div>
    </div>
</body>

</htmL>