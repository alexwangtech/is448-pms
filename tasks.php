<?php

session_start();

// if the session 'userId' is not set, redirect back to the login page
if (!isset($_SESSION['userId'])) {
    header('Location: index.php');
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <?php include 'includes/bootstrap-scripts.php'?>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="icon" href="favicon.ico">
    <title>Tasks</title>
</head>

<body>
    <?php include 'components/sidebar.php';?>
    <div id="mainContent">
        <?php include 'components/navbar.php';?>
        <h1 class="display-4 d-inline-block" style="width:1180px;">My Tasks</h1>
        <button type="button" class="btn btn-outline-success mb-3" data-toggle="modal" data-target="#newTaskModal">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
        </button>
        <div id="taskList"></div>
    </div>

    <!-- Create New Task Modal -->
    <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Your content goes here -->
                    <form>
                        <div class="form-group">
                            <label for="taskNameInput">Name</label>
                            <input type="text" class="form-control" id="taskNameInput" name="taskName"
                                placeholder="Task Name">
                        </div>
                        <div class="form-group">
                            <label for="taskDueDateInput">Due Date</label>
                            <input type="date" class="form-control" id="taskDueDateInput" name="taskDueDate">
                        </div>
                        <div class="form-group">
                            <label for="taskDescriptionInput">Description</label>
                            <textarea class="form-control" id="taskDescriptionInput" rows="3"
                                placeholder="Task Description"></textArea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-dismiss="modal"
                        onclick="clearNewTaskFields()">Cancel</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal"
                        onclick="createNewTask()">Create</button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/tasklist.js"></script>
    <script>
    // use our PHP $_SESSION to set a userId value
    const userId = <?php echo $_SESSION['userId'];?>

    // create an instance of the TaskList class
    var taskList = new TaskList('taskList', userId);

    // FUNCTION: Clears all of the fields of the new modal
    function clearNewTaskFields() {
        document.getElementById('taskNameInput').value = '';
        document.getElementById('taskDueDateInput').value = '';
        document.getElementById('taskDescriptionInput').value = '';
    }

    // FUNCTION: Create a new task
    function createNewTask() {
        // get the values from the input fields
        const taskName = document.getElementById('taskNameInput').value;
        const taskDueDate = document.getElementById('taskDueDateInput').value;
        const taskDescription = document.getElementById('taskDescriptionInput').value;

        // call the createTask() method from our TaskList instance
        taskList.createNewTask(taskName, taskDueDate, taskDescription);

        // clear the values from the modal
        clearNewTaskFields();
    }
    </script>
</body>

</html>