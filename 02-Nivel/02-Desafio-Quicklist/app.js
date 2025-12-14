const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.querySelector("ul");
const alerta = document.getElementById("alerta");

const close = alerta.querySelector("a");
close.addEventListener("click", () => {
    alerta.classList.remove("show-alerta");
});

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const inputValue = todoInput.value.trim();

    if (inputValue.length > 0) {
        const todoObject = {
            text: inputValue,
            completed: false,
        };

        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerText = "";

    allTodos.forEach((todo, todoIndex) => {
        newItem = createTodoItem(todo, todoIndex);
        todoListUL.append(newItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const chkID = "chk-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;

    todoLI.innerHTML = `
        <div class="check-box">
            <input type="checkbox" id="${chkID}">
        </div>
        <label for="${chkID}">
            ${todoText}
        </label>
        <a href="#" class="delete-button">
            <img src="assets/icons/garbage.svg" alt="garbage">
        </a>
    `;

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        alerta.classList.add("show-alerta");

        deleteItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;

    return todoLI;
}

function deleteItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const allTodosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todosLocal", allTodosJSON);

    console.log(allTodos);
}

function getTodos() {
    const todos = localStorage.getItem("todosLocal") || "[]";
    return JSON.parse(todos);
}
