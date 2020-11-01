<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'includes/bootstrap-scripts.php';?>
    <link rel="stylesheet" href="styles/styles.css">
    <meta charset="UTF-8">
    <title>Personnel</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <h1 class="mb-4">Personnel Table</h1>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-11">
                    <form>
                        <div class="form-row">
                            <div class="form-group col">
                                <input type="text" name="firstName" placeholder="First Name" class="form-control">
                            </div>
                            <div class="form-group col">
                                <input type="text" name="lastName" placeholder="Last Name" class="form-control">
                            </div>
                            <div class="form-group col">
                                <input type="text" name="departmentName" placeholder="Department Name"
                                    class="form-control">
                            </div>
                            <div class="form-group col">
                                <input type="text" name="email" placeholder="Email" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-outline-primary">Search</buston>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Email</th>
                                <th></th> <!-- Blank <th> to make space for delete and edit buttons -->
                            </tr>
                        </thead>
                        <tbody id="personnelTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script src="js/personnel-table.js"></script>
</body>

</html>