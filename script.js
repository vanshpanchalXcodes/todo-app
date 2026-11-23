let tasks = [];
const list = document.getElementById('task-list');

function render() {
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    list.appendChild(li);
  });
}

render();