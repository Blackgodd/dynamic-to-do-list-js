// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // "Add Task" button
    const taskInput = document.getElementById('task-input');   // Input field for new tasks
    const taskList = document.getElementById('task-list');     // Unordered list to display tasks

    /**
     * Function to add a new task to the task list
     */
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Exit the function if input is empty
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText; // Set the text of the task

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";    // Button text
        removeButton.className = 'remove-btn';   // Assign class for styling

        /**
         * Event handler to remove the task when the "Remove" button is clicked
         */
        removeButton.onclick = function () {
            taskList.removeChild(taskItem); // Remove the <li> element from the task list
        };

        // Append the "Remove" button to the <li> element
        taskItem.appendChild(removeButton);

        // Append the <li> element to the task list
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    /**
     * Event handler to add a task when the "Add Task" button is clicked
     */
    addButton.addEventListener('click', addTask);

    /**
     * Event handler to add a task when the "Enter" key is pressed within the input field
     */
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') { // Check if the pressed key is "Enter"
            addTask(); // Call the addTask function
        }
    });

});