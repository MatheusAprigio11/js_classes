// Selectors
const form = document.querySelector("form");
const taskList = document.getElementById("task-list");

// Event listeners
form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("change", handleTaskClick);

// Functions
function addTask(event) {
  event.preventDefault();
  const newTaskInput = document.getElementById("new-task");
  const newTaskText = newTaskInput.value.trim();
  if (newTaskText === "") {
    return;
  }
  const newTask = createTask(newTaskText);
  taskList.appendChild(newTask);
  newTaskInput.value = "";
}

function createTask(text) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  const span = document.createElement("span");
  span.setAttribute("class","task");
  span.textContent = text;
  span.contentEditable = true;
  span.classList.add("editable");
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.classList.add("delete-btn");
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  return li;
}

function deleteTask(event) {
  if (event.target.classList.contains("delete-btn")) {
    const li = event.target.closest("li");
    li.remove();
  }
}

function handleTaskClick(event) {
    const target = event.target;
    if (target.matches("#checkbox")) {
      const li = target.parentElement;
      if (target.checked) {
        li.style.backgroundColor = "#99ff99";
      } else {
        li.style.backgroundColor = "initial";
      }
    } else if (target.classList.contains("delete-btn")) {
      const li = target.closest("li");
      li.remove();
    }
  }

// Sortable drag and drop functionality
Sortable.create(taskList, {
  animation: 150,
  handle: ".editable",
  filter: ".delete-btn",
  onEnd: function (event) {
    event.item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }
});
