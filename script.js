let tasks = [
  { id: 1, text: "Test One", done: false },
  { id: 2, text: "Test Two", done: true },
  { id: 3, text: "Test Three", done: false },
];
const list = document.getElementById("task-list");
let editingId = null;
function render() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    // Edit mode: show a text box instead of the normal row
    if (task.id === editingId) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.text;
      editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const newText = editInput.value.trim();
          if (newText !== "") {
            task.text = newText;
          }
          editingId = null;
          render();
        } else if (event.key === "Escape") {
          editingId = null;
          render();
        }
      });
      li.appendChild(editInput);
      list.appendChild(li);
      editInput.focus();
      return;
    }

    // Normal mode
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      render();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editingId = task.id;
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}
render();

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  render();
});
