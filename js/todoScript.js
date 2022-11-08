const todoInput = document.querySelector(".todo-input input");
const filters = document.querySelectorAll(".filters span");
const todoBox = document.querySelector(".todo-box");
const clearAll = document.querySelector(".clear-btn");
let tasks = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEdited = false;

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTasks(btn.id);
  });
});

function showTasks(filter) {
  let li = "";
  if (tasks) {
    tasks.forEach((task, id) => {
      // if is completed, set the isCompleted value to checked(refresh will be same status)
      let isCompleted = task.status == "completed" ? "checked" : "";
      if (filter == task.status || filter == "all") {
        li += `
        <li class="todo">
          <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}> 
            <p class="${isCompleted}">${task.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="material-symbols-outlined"> more_horiz </i>
            <ul class="todo-menu">
              <li onclick="editTodo(${id}, '${task.name}')"><i class="material-symbols-outlined"> edit </i>Edit</li>
              <li onclick="deleteTodo(${id})"><i class="material-symbols-outlined"> delete </i>Delete</li>
            </ul>
          </div>
        </li>`;
      }
    });
  }

  todoBox.innerHTML = li || `<span>It's all clear :D</span>`;
}

showTasks("all");

function showMenu(selectedTodo) {
  let todoMenu = selectedTodo.parentElement.lastElementChild;
  todoMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTodo) {
      todoMenu.classList.remove("show");
    }
  });
}

function editTodo(id, taskName) {
  isEdited = true;
  editId = id;
  todoInput.value = taskName;
}

function deleteTodo(deleteId) {
  // remove selected task from array/todos
  tasks.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(tasks));
  showTasks("all");
}

function updateStatus(selectedTodo) {
  // get paragraph that contains task name
  let todoName = selectedTodo.parentElement.lastElementChild;
  if (selectedTodo.checked) {
    todoName.classList.add("checked");
    tasks[selectedTodo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    tasks[selectedTodo.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(tasks));
}

clearAll.addEventListener("click", () => {
  tasks.splice(0, tasks.length);
  localStorage.setItem("todo-list", JSON.stringify(tasks));
  showTasks("all");
});

todoInput.addEventListener("keyup", (e) => {
  let userTodo = todoInput.value.trim(); //prevent user input empty value
  if (e.key == "Enter" && userTodo) {
    if (!isEdited) {
      if (!tasks) {
        //if task isn't existed, pass an empty array to tasks
        tasks = [];
      }
      let todoInfo = { name: userTodo, status: "pending" }; //by defalt todo status will be pending
      tasks.push(todoInfo);
    } else {
      isEdited = false;
      tasks[editId].name = userTodo;
    }
    todoInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(tasks)); //save to localstorage with todo-list name, then have to convert data into string
    showTasks("all");
  }
});
