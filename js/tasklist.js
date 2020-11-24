class TaskList {
    constructor(divId, userId) {
        this.divId = divId;
        this.userId = userId;
        this.taskId;

        // set to empty for now, because we are fetching data using async request
        this.data = [];

        // Add an event listener to the "Save" button of the "Edit Task" modal
        document.getElementById('editTaskSaveBtn').addEventListener('click', function () {
            this.updateTask();
        }.bind(this));

        this.getData();
    }

    getData() {
        // make a GET request to the action file
        $.get('actions/get-all-tasks.php', { userId: this.userId }, function (res) {
            // set the data, and then re-render the tasklist
            this.data = JSON.parse(res);
            this.renderData();
        }.bind(this));
    }

    createNewTask(taskName, taskDueDate, taskDescription) {
        // create a JSON object
        const jsonObj = {
            userId: this.userId,
            taskName: taskName,
            taskDueDate: taskDueDate,
            taskDescription: taskDescription
        };

        // make a POST request
        $.post('actions/create-new-task.php', jsonObj, function (res) {
            // we can get all data again (re-renders automatically)
            this.getData();
        }.bind(this));
    }

    updateTask(task) {
        // Get the values from the "Edit Task" modal inputs
        const newName = document.getElementById('editTaskName').value;
        const newDueDate = document.getElementById('editTaskDueDate').value;
        const newDescription = document.getElementById('editTaskDescription').value;

        // Create a JSON object
        const jsonObj = {
            taskId: this.taskId,
            taskName: newName,
            taskDueDate: newDueDate,
            taskDescription: newDescription
        };

        // Make a POST request
        $.post('actions/update-task.php', jsonObj, function (res) {
            // we can get all data again (re-renders automatically)
            this.getData();
        }.bind(this));

        // Hide the "Edit Task" modal
        $('#editTaskModal').modal('hide');
    }

    deleteTask(task) {
        // get the task id from the provided task
        const taskId = task['taskId'];

        // create a JSON object
        const jsonObj = {
            taskId: taskId
        };

        // make a POST request
        $.post('actions/delete-task.php', jsonObj, function (res) {
            // call the getData() method, which will grab all data and re-render
            this.getData();
        }.bind(this));
    }

    renderData() {
        // CONSTANTS
        const LINE_LIMIT = 4; // only 4 items per line

        let mainDiv = document.getElementById(this.divId);

        let flexDiv;
        let counter = 1; // start at 1, increment towards "LINE_LIMIT"

        // reset everything in the main div
        mainDiv.innerHTML = '';

        this.data.forEach((item, index) => {

            // create the outer div (for margins/spacing)
            let outerDiv = document.createElement('div');
            outerDiv.classList.add('m-3', 'zoom-on-hover');

            // create the card outline and add class + style
            let card = document.createElement('div');
            card.classList.add('card', 'shadow', 'p-3', 'bg-white', 'rounded', 'h-100');
            card.style.width = '18rem';

            // create the close button
            let closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('aria-label', 'Close');
            closeButton.classList.add('close', 'float-right', 'absolute-top-right', 'mt-2', 'mr-2');
            closeButton.innerHTML = `<span aria-hidden="true">&times;</span>`;

            // create the card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // create the card title
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = item['taskName'];

            // create the card subtitle
            let cardSubtitle = document.createElement('h6');
            cardSubtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
            cardSubtitle.innerHTML = item['taskDueDate'];

            // create the card description
            let cardDescription = document.createElement('p');
            cardDescription.classList.add('card-text', 'whitespace-preline');
            cardDescription.innerHTML = item['description'];

            // append all of the card body items into the card body
            cardBody.append(closeButton);
            cardBody.append(cardTitle);
            cardBody.append(cardSubtitle);
            cardBody.append(cardDescription);

            // append the card body into the card
            card.append(cardBody);

            // append the card into the outer div
            outerDiv.append(card);

            // if this is the beginning of the line AND last item, create flex div + end it
            if (counter === 1 && (index + 1 === this.data.length)) {
                flexDiv = document.createElement('div');
                flexDiv.classList.add('d-flex');
                outerDiv.classList.remove('m-3');
                outerDiv.classList.add('ml-0', 'mr-3', 'mt-3', 'mb-3');
                flexDiv.append(outerDiv);
                mainDiv.append(flexDiv);
                counter = counter + 1;
            }
            // if this is the beginning of the line, create the flex div + append to it + increment
            else if (counter === 1) {
                flexDiv = document.createElement('div');
                flexDiv.classList.add('d-flex');
                outerDiv.classList.remove('m-3');
                outerDiv.classList.add('ml-0', 'mr-3', 'mt-3', 'mb-3');
                flexDiv.append(outerDiv);
                counter = counter + 1;
            }
            // if this is the end of the line (or if last item), append + reset counter
            else if (counter === LINE_LIMIT || (index + 1 === this.data.length)) {
                flexDiv.append(outerDiv);
                mainDiv.append(flexDiv);
                counter = 1;
            }
            // otherwise, just append it to the flex div normally + increment
            else {
                flexDiv.append(outerDiv);
                counter = counter + 1;
            }

            // add an action listener to the close button
            closeButton.addEventListener('click', function () {
                // upon click, we want to call the delete function
                this.deleteTask(item);
            }.bind(this));

            // Add an event listener to the overall card body (double click)
            outerDiv.addEventListener('dblclick', function () {
                // Get the references to the input fields of the "Edit Task" modal
                const editTaskName = document.getElementById('editTaskName');
                const editTaskDueDate = document.getElementById('editTaskDueDate');
                const editTaskDescription = document.getElementById('editTaskDescription');

                // We want to populate the fields of the "Edit Task Modal" with the data
                editTaskName.value = item['taskName'];
                editTaskDueDate.value = item['taskDueDate'];
                editTaskDescription.value = item['description'];

                // Set the global taskId value
                this.taskId = item['taskId'];

                // Open the "Edit Task" Modal using jQuery
                $('#editTaskModal').modal('show');

            }.bind(this));
        });
    }
}
