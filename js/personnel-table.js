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

            // create a delete icon
            let deleteIcon = document.createElement('button');
            deleteIcon.classList.add('btn', 'btn-outline-danger');
            deleteIcon.innerHTML = `
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>`;

            // append the delete icon to a td element + append to table row
            let tableData = document.createElement('td');
            tableData.append(deleteIcon);
            tableRow.append(tableData);

            // append the table row to the table body
            tableBody.append(tableRow);
        });
    }
}

const personnelIds = [
    'personnelTableBody',
    'firstNameField',
    'lastNameField',
    'departmentField',
    'emailField',
    'searchButton'
];

var personnelTable = new PersonnelTable(...personnelIds);
