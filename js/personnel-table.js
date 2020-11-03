class PersonnelTable {

    constructor(tbodyId, firstNameFieldId, lastNameFieldId, departmentFieldId, emailFieldId, searchButtonId) {
        this.tbodyId = tbodyId;
        this.firstNameFieldId = firstNameFieldId;
        this.lastNameFieldId = lastNameFieldId;
        this.departmentFieldId = departmentFieldId;
        this.emailFieldId = emailFieldId;
        this.searchButtonId = searchButtonId;
        this.data = this.getData();
        this.renderData = this.data;

        this.render();
    }

    getData() {
        const testData = [
            {
                firstName: "Alexander",
                lastName: "Wang",
                department: "Software Development",
                email: "alex915979wang@gmail.com"
            },
            {
                firstName: "Raymond",
                lastName: "Wang",
                department: "Information Systems",
                email: "wanalex1@umbc.edu"
            },
            {
                firstName: "Bob",
                lastName: "Ross",
                department: "Painting",
                email: "bobross@gmail.com"
            },
            {
                firstName: "Chad",
                lastName: "Whick",
                department: "Acting",
                email: "chadwick@gmail.com"
            },
            {
                firstName: "Jayce",
                lastName: "Leee",
                department: "Heroes",
                email: "jaycelee123@heroes.com"
            },
            {
                firstName: "Naofumi",
                lastName: "Tate",
                department: "Shield Hero",
                email: "shieldheroesrising@gmail.com"
            },
            {
                firstName: "Nick",
                lastName: "Chang",
                department: "Supply Chain Management",
                email: "nickchang@gmail.com"
            },
            {
                firstName: "Adharsh",
                lastName: "Babu",
                department: "Computer Science",
                email: "ababu@gmail.com"
            },
            {
                firstName: "Warwick",
                lastName: "Wolf",
                department: "League of Legends",
                email: "bloodthirsty@gmail.com"
            },
            {
                firstName: "Lux",
                lastName: "Mage",
                department: "Demacia",
                email: "ladyofluminosity@gmail.com"
            }
        ];

        // add an event listener to the search button
        document.getElementById(this.searchButtonId).addEventListener('click', this.search.bind(this));

        return testData;
    }

    search() {
        // get the values from the text fields
        const firstName = document.getElementById(this.firstNameFieldId).value;
        const lastName = document.getElementById(this.lastNameFieldId).value;
        const department = document.getElementById(this.departmentFieldId).value;
        const email = document.getElementById(this.emailFieldId).value;

        // reset the values for 'this.renderData'
        this.renderData = [];

        // search for values in 'this.data' that have the substring values (case-insensitive)
        this.data.forEach((item) => {
            const firstNameIndex = item['firstName'].toLowerCase().indexOf(firstName.toLowerCase());
            const lastNameIndex = item['lastName'].toLowerCase().indexOf(lastName.toLowerCase());
            const departmentIndex = item['department'].toLowerCase().indexOf(department.toLowerCase());
            const emailIndex = item['email'].toLowerCase().indexOf(email.toLowerCase());

            if (firstNameIndex !== -1 &&
                lastNameIndex !== -1 &&
                departmentIndex !== -1 &&
                emailIndex !== -1) {
                this.renderData.push(item);
            }
        });

        // re-render the table
        this.render();
    }

    add(firstName, lastName, department, email) {
        // in the future, this should make an ajax request or something !!!

        // create a new personnel
        const newPersonnel = {
            firstName: firstName,
            lastName: lastName,
            department: department,
            email: email
        };

        // add the new personnel to 'this.data'
        this.data.push(newPersonnel);

        // in case there are search parameters, call the search method
        this.search();
    }

    edit(item) { // refactor this code in the future
        // get the original modal buttons (to store a referenc to)
        const cancelButton = document.getElementById('cancelButton');
        const createButton = document.getElementById('createButton'); // probably don't need this

        // change the title of the modal to "Edit Personnel"
        const modalTitle = document.getElementById('modalTitle');
        modalTitle.innerHTML = 'Edit Personnel';

        // get the modal footer <div> id
        const modalFooter = document.getElementById('modalFooter');

        // create a new "save" button
        const saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.classList.add('btn', 'btn-outline-primary');
        saveButton.setAttribute('data-dismiss', 'modal');

        // clear the modal footer and append the cancel and save buttons
        modalFooter.innerHTML = '';
        modalFooter.append(cancelButton);
        modalFooter.append(saveButton);

        // set the initial values of the text fields
        document.getElementById('modalFirstName').value = item['firstName'];
        document.getElementById('modalLastName').value = item['lastName'];
        document.getElementById('modalDepartment').value = item['department'];
        document.getElementById('modalEmail').value = item['email'];

        // add an event listener for the saveButton
        saveButton.addEventListener('click', function () {

            // get the new values of the text fields (refactor this eventually)
            const firstName = document.getElementById('modalFirstName').value;
            const lastName = document.getElementById('modalLastName').value;
            const department = document.getElementById('modalDepartment').value;
            const email = document.getElementById('modalEmail').value;

            // get the index of the current item
            const index = this.data.indexOf(item);

            // create a new personnel
            const newPersonnel = {
                firstName: firstName,
                lastName: lastName,
                department: department,
                email: email
            };

            // replace the item at that specified index
            this.data[index] = newPersonnel;

            // recall the search method
            this.search();

        }.bind(this));
    }

    delete(item) {
        // remove the item from the list of data (this.data)
        const index = this.data.indexOf(item);
        this.data.splice(index, 1);

        // in case there are search parameters, reperform search
        this.search();
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

            // add an event listener to the edit button
            editButton.addEventListener('click', function () { this.edit(item) }.bind(this));
            editButton.setAttribute('data-toggle', 'modal');
            editButton.setAttribute('data-target', '#newPersonnelModal');

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
