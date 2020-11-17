<?php

session_start();

// if the SESSION 'userType' key doesn't exist, redirect to login page
if (!isset($_SESSION['userType'])) {
    header('Location: index.php');
    exit();
}
else {
    // if 'userType' is NOT 'Owner' or 'Manager', redirect to calendar page
    if ($_SESSION['userType'] != 'Owner' && $_SESSION['userType'] != 'Manager') {
        header('Location: calendar.php');
        exit();
    }

    // otherwise, this page can continue rendering
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <?php include 'includes/bootstrap-scripts.php';?>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="icon" href="favicon.ico">
    <title>Personnel</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col">
                    <h1 class="mb-4 display-4">Personnel Table</h1>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-outline-success" data-toggle="modal"
                        data-target="#newPersonnelModal">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                </div>
                <hr>
            </div>
            <div class="row">
                <div class="col">
                    <form>
                        <div class="container-fluid p-0">
                            <div class="row">
                                <div class="col-11">
                                    <div class="form-row">
                                        <div class="form-group col-1">
                                            <input id="idField" type="text" name="id" placeholder="ID"
                                                class="form-control">
                                        </div>
                                        <div class="form-group col">
                                            <input id="firstNameField" type="text" name="firstName"
                                                placeholder="First Name" class="form-control">
                                        </div>
                                        <div class="form-group col">
                                            <input id="lastNameField" type="text" name="lastName"
                                                placeholder="Last Name" class="form-control">
                                        </div>
                                        <div class="form-group col">
                                            <input id="departmentField" type="text" name="departmentName"
                                                placeholder="Department Name" class="form-control">
                                        </div>
                                        <div class="form-group col">
                                            <input id="userTypeField" type="text" name="userType"
                                                placeholder="User Type" class="form-control">
                                        </div>
                                        <div class="form-group col">
                                            <input id="emailField" type="text" name="email" placeholder="Email"
                                                class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                    <button id="searchButton" type="button"
                                        class="btn btn-outline-primary">Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">User Type</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th> <!-- Blank <th> to make space for delete and edit buttons -->
                            </tr>
                        </thead>
                        <tbody id="personnelTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Personnel Modal -->
    <div id="newPersonnelModal" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">New Personnel</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Your content goes here -->
                    <form>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="createFirstName">First Name</label>
                                <input type="text" id="createFirstName" name="createFirstName" placeholder="First Name"
                                    class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="createLastName">Last Name</label>
                                <input type="text" id="createLastName" name="createLastName" placeholder="Last Name"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="createDepartment">Department</label>
                                <input type="text" id="createDepartment" name="createDepartment"
                                    placeholder="Department" class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="createUserType">User Type</label>
                                <input type="text" id="createUserType" name="createUserType" placeholder="User Type"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="createEmail">Email</label>
                                <input type="text" id="createEmail" name="createEmail" placeholder="Email"
                                    class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="createPassword">Password</label>
                                <input type="text" id="createPassword" name="createPassword" placeholder="Password"
                                    class="form-control" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="modalFooter">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal"
                        onclick="clearCreateFields()" id="cancelButton">Cancel</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal"
                        onclick="createPersonnel()" id="createButton">Create</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Personnel Modal -->
    <div id="editPersonnelModal" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Edit Personnel</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Your content goes here -->
                    <form>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="editFirstName">First Name</label>
                                <input type="text" id="editFirstName" name="editFirstName" placeholder="First Name"
                                    class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="editLastName">Last Name</label>
                                <input type="text" id="editLastName" name="editLastName" placeholder="Last Name"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="editDepartment">Department</label>
                                <input type="text" id="editDepartment" name="editDepartment" placeholder="Department"
                                    class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="editUserType">User Type</label>
                                <input type="text" id="editUserType" name="editUserType" placeholder="User Type"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <label for="editEmail">Email</label>
                                <input type="text" id="editEmail" name="editEmail" placeholder="Email"
                                    class="form-control" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="modalFooter">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onclick=""
                        id="cancelEditButton">Cancel</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal" onclick=""
                        id="saveEditButton">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/personnel-table.js"></script>
    <script>
    const personnelIds = [
        'personnelTableBody',
        'idField',
        'firstNameField',
        'lastNameField',
        'departmentField',
        'userTypeField',
        'emailField',
        'searchButton'
    ];

    var personnelTable = new PersonnelTable(...personnelIds);

    const createModalIds = [
        'createFirstName',
        'createLastName',
        'createDepartment',
        'createUserType',
        'createEmail',
        'createPassword'
    ];

    const editModalIds = [
        'editFirstName',
        'editLastName',
        'editDepartment',
        'editUserType',
        'editEmail'
    ];

    const cancelButton = document.getElementById('cancelButton');
    const createButton = document.getElementById('createButton');
    const modalFooter = document.getElementById('modalFooter');

    function clearCreateFields() {
        createModalIds.forEach((item) => {
            document.getElementById(item).value = '';
        });
    }

    function createPersonnel() {
        const createFirstName = document.getElementById('createFirstName').value;
        const createLastName = document.getElementById('createLastName').value;
        const createDepartment = document.getElementById('createDepartment').value;
        const createUserType = document.getElementById('createUserType').value;
        const createEmail = document.getElementById('createEmail').value;
        const createPassword = document.getElementById('createPassword').value;

        personnelTable.add(createFirstName, createLastName, createDepartment, createUserType, createEmail,
            createPassword);

        clearCreateFields();
    }
    </script>
</body>

</html>