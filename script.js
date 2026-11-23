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

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '') return;
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = '';
  render();
})