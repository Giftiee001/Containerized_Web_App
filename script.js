// script.js

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    }
});

function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.classList.add('task-item');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.title = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        taskItem.remove();
        saveTasks();
    });

    const updateButton = document.createElement('button');
    updateButton.innerHTML = '<i class="fa-solid fa-file-pen"></i>';
    updateButton.title = 'Update';
    updateButton.classList.add('update-button');
    updateButton.addEventListener('click', function() {
        const updatedTaskText = prompt('Update task:', taskText);
        if (updatedTaskText && updatedTaskText.trim() !== '') {
            taskItem.textContent = updatedTaskText;
            saveTasks();
        }
    });

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.title = 'Complete';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(updateButton);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);
}

// Load saved tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => addTask(taskText));
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push(taskItem.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
