class PersonnelTable {

    constructor(tbodyId, idField, firstNameFieldId, lastNameFieldId, departmentFieldId, userTypeFieldId, emailFieldId, searchButtonId) {
        this.tbodyId = tbodyId;
        this.idField = idField;
        this.firstNameFieldId = firstNameFieldId;
        this.lastNameFieldId = lastNameFieldId;
        this.departmentFieldId = departmentFieldId;
        this.userTypeFieldId = userTypeFieldId;
        this.emailFieldId = emailFieldId;
        this.searchButtonId = searchButtonId;
        this.data = []; // due to async GET request, leave empty and update later
        this.renderData = this.data;

        // add an event listener to the search button
        document.getElementById(this.searchButtonId).addEventListener('click', this.search.bind(this));

        // We need to get the privilege level for this user (assume it's false)
        this.fullPrivilege = false;

        // Async POST request to get/set the user privilege level
        $.post('actions/get-privilege.php', function (res) {
            this.fullPrivilege = (res === 'Owner');
            // get the data (ASYNC)
            this.getData();
        }.bind(this));

        this.render();
    }

    getData() {

        // we will make a GET request and re-render when we get the data
        $.get('actions/get-all-personnel.php', function (res) {
            this.data = JSON.parse(res);
            this.search();
        }.bind(this));
    }

    search() {
        // get the values from the text fields
        const id = document.getElementById(this.idField).value;
        const firstName = document.getElementById(this.firstNameFieldId).value;
        const lastName = document.getElementById(this.lastNameFieldId).value;
        const department = document.getElementById(this.departmentFieldId).value;
        const userType = document.getElementById(this.userTypeFieldId).value;
        const email = document.getElementById(this.emailFieldId).value;

        // reset the values for 'this.renderData'
        this.renderData = [];

        // search for values in 'this.data' that have the substring values (case-insensitive)
        this.data.forEach((item) => {
            const idIndex = item['userId'].toLowerCase().indexOf(id.toLowerCase())
            const firstNameIndex = item['firstName'].toLowerCase().indexOf(firstName.toLowerCase());
            const lastNameIndex = item['lastName'].toLowerCase().indexOf(lastName.toLowerCase());
            const departmentIndex = item['departmentName'].toLowerCase().indexOf(department.toLowerCase());
            const userTypeIndex = item['userType'].toLowerCase().indexOf(userType.toLowerCase());
            const emailIndex = item['email'].toLowerCase().indexOf(email.toLowerCase());

            if (idIndex !== -1 &&
                firstNameIndex !== -1 &&
                lastNameIndex !== -1 &&
                departmentIndex !== -1 &&
                userTypeIndex !== -1 &&
                emailIndex !== -1) {
                this.renderData.push(item);
            }
        });

        // re-render the table
        this.render();
    }

    add(firstName, lastName, department, userType, email, password) {
        // construct a new JSON object
        const jsonObj = {
            firstName: firstName,
            lastName: lastName,
            department: department,
            userType: userType,
            email: email,
            password: password
        };

        // send this object to the "server" with a POST request
        $.post('actions/add-new-personnel.php', jsonObj, function (res) {
            // get all data again (that method will re-render)
            this.getData();
        }.bind(this));

        // in case there are search parameters, call the search method
        this.search();
    }

    edit(item) { // refactor this code in the future

        // set the modal edit fields
        document.getElementById('editFirstName').value = item['firstName'];
        document.getElementById('editLastName').value = item['lastName'];
        document.getElementById('editDepartment').value = item['departmentName'];
        document.getElementById('editUserType').value = item['userType'];
        document.getElementById('editEmail').value = item['email'];

        // add an event listener for the saveButton
        document.getElementById('saveEditButton').addEventListener('click', function () {

            // get the new values of the text fields (refactor this eventually)
            const firstName = document.getElementById('editFirstName').value;
            const lastName = document.getElementById('editLastName').value;
            const department = document.getElementById('editDepartment').value;
            const userType = document.getElementById('editUserType').value;
            const email = document.getElementById('editEmail').value;

            // String for storing any alerts that need to be displayed
            let alertString = '';

            // If there are any blank values, append to the alert string
            if (firstName == '' || lastName == '' || department == '' ||
                userType == '' || email == '') {

                alertString += 'Please fill out any missing values!';
            }

            // If the email is not formatted, append to the alert string
            if (!validateEmail(email)) {
                alertString += '\n' + 'Please enter a valid email!';
            }

            // If there are alerts, alert the user and stop the flow of this function
            if (alertString != '') {
                alert(alertString);
                return;
            }

            // get the userId of the current item
            const userId = item['userId'];

            // create a JSON object
            const jsonObj = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                department: department,
                userType: userType,
                email: email
            };

            // make a POST call
            $.post('actions/update-personnel.php', jsonObj, function (res) {
                // get all data again (automatically re-renders)
                this.getData();

            }.bind(this));

            // Close the modal manually
            $('#editPersonnelModal').modal('hide');

        }.bind(this));
    }

    delete(item) {
        // get the item's userId
        const userId = item['userId'];

        // create a JSON object
        const jsonObj = {
            userId: userId
        };

        // make a post request to delete the item
        $.post('actions/delete-personnel.php', jsonObj, function () {
            // get all data (automatically re-renders the table)
            this.getData();
        }.bind(this));
    }

    render() {
        // get the table body element
        let tableBody = document.getElementById(this.tbodyId);

        // clear everything first in case items already exist
        tableBody.innerHTML = '';

        this.renderData.forEach((item) => {
            // create a table row
            let tableRow = document.createElement('tr');

            for (const key in item) {
                // create a table data
                let tableData = document.createElement('td');
                tableData.innerHTML = item[key];
                tableRow.append(tableData);
            }

            // create an edit button
            let editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-outline-warning', 'mr-1');
            editButton.innerHTML = `
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>`;

            // create a delete button
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-outline-danger');
            deleteButton.innerHTML = `
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>`;

            // If the user doesn't have full privilege (not an Owner), disable the "Edit" and "Delete" buttons.
            // This only applies to table entries that have an "Owner" status.
            // In addition, we want to set the color to gray so that the user explicity knows that the buttons are disabled.
            if (!this.fullPrivilege && item['userType'] === 'Owner') {
                editButton.setAttribute('disabled', 'true');
                editButton.classList.remove('btn-outline-warning');
                editButton.classList.add('btn-outline-secondary');

                deleteButton.setAttribute('disabled', 'true');
                deleteButton.classList.remove('btn-outline-danger');
                deleteButton.classList.add('btn-outline-secondary');
            }

            // add an event listener to the edit button
            editButton.addEventListener('click', function () { this.edit(item) }.bind(this));
            editButton.setAttribute('data-toggle', 'modal');
            editButton.setAttribute('data-target', '#editPersonnelModal');

            // add an event listener to the delete button
            deleteButton.addEventListener('click', function () { this.delete(item) }.bind(this));

            // append the buttons to a td element + append to table row
            let buttonsTableData = document.createElement('td');
            buttonsTableData.append(editButton);
            buttonsTableData.append(deleteButton);
            tableRow.append(buttonsTableData);

            // append the table row to the table body
            tableBody.append(tableRow);
        });
    }
}
