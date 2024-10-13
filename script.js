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

// script.js

// Initialize an empty tasks array
let tasks = [];

// Function to load tasks from Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
        ${task} <button class="remove">Remove</button>
    `;
    taskList.appendChild(taskItem);
    // Add event listener for the remove button
    taskItem.querySelector('.remove').addEventListener('click', () => {
        removeTask(taskItem, task);
    });
}

// Function to handle adding a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        tasks.push(taskText); // Update the tasks array
        addTaskToDOM(taskText); // Add task to the DOM
        saveTasks(); // Save updated tasks to Local Storage
        taskInput.value = ''; // Clear input field
    }
}

// Function to remove a task
function removeTask(taskItem, task) {
    taskItem.remove(); // Remove the task from the DOM
    tasks = tasks.filter(t => t !== task); // Update tasks array
    saveTasks(); // Save updated tasks to Local Storage
}

// Function to save tasks to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for DOMContentLoaded to load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('add-task').addEventListener('click', addTask);
});
