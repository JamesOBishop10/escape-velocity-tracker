// Save and load tasks using localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({ text: li.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) li.classList.add('completed');
      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
      document.getElementById('task-list').appendChild(li);
    });
  }
}

document.getElementById('task-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;
    newTask.addEventListener('click', function () {
      newTask.classList.toggle('completed');
      saveTasks();
    });
    document.getElementById('task-list').appendChild(newTask);
    taskInput.value = '';
    saveTasks();
  }
});

document.getElementById('clear-all').addEventListener('click', function () {
  document.getElementById('task-list').innerHTML = '';
  saveTasks();
});

// Dark Mode Toggle
const toggleButton = document.getElementById('toggle-dark-mode');
toggleButton.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Restore dark mode setting on load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  loadTasks();
});
