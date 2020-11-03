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
        <div class="container-fluid p-0">
            <div class="row">
                <div class="col">
                    <h1 class="mb-4">Personnel Table</h1>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-outline-success" data-toggle="modal"
                        data-target="#newPersonnelModal" onclick="setModeCreate()">
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

    <!-- The modal for creating a new personnel -->
    <div id="newPersonnelModal" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Personnel</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Your content goes here -->
                    <form>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="modalFirstName">First Name</label>
                                <input type="text" id="modalFirstName" name="modalFirstName" placeholder="First Name"
                                    class="form-control" required>
                            </div>
                            <div class="form-group col-6">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="modalLastName" name="modalLastName" placeholder="Last Name"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <label for="modalDepartment">Department</label>
                                <input type="text" id="modalDepartment" name="modalDepartment" placeholder="Department"
                                    class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <label for="modalEmail">Email</label>
                                <input type="text" id="modalEmail" name="modalEmail" placeholder="Email"
                                    class="form-control" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="modalFooter">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onclick="clearFields()"
                        id="cancelButton">Cancel</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal"
                        onclick="createPersonnel()" id="createButton">Create</button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/personnel-table.js"></script>
    <script>
    const personnelIds = [
        'personnelTableBody',
        'firstNameField',
        'lastNameField',
        'departmentField',
        'emailField',
        'searchButton'
    ];

    var personnelTable = new PersonnelTable(...personnelIds);

    let modalInputIds = [
        'modalFirstName',
        'modalLastName',
        'modalDepartment',
        'modalEmail'
    ];

    const cancelButton = document.getElementById('cancelButton');
    const createButton = document.getElementById('createButton');
    const modalFooter = document.getElementById('modalFooter');

    function clearFields() {
        modalInputIds.forEach((item) => {
            document.getElementById(item).value = '';
        });
    }

    function setModeCreate() {
        // this needs to be done because the personnel-table javascript might modify the modal

        // clear the text fields
        clearFields();

        // put the cancel and save buttons in place
        modalFooter.innerHTML = '';
        modalFooter.append(cancelButton);
        modalFooter.append(createButton);
    }

    function createPersonnel() {
        const modalFirstName = document.getElementById('modalFirstName').value;
        const modalLastName = document.getElementById('modalLastName').value;
        const modalDepartment = document.getElementById('modalDepartment').value;
        const modalEmail = document.getElementById('modalEmail').value;

        personnelTable.add(modalFirstName, modalLastName, modalDepartment, modalEmail);

        clearFields();
    }
    </script>
</body>

</html>