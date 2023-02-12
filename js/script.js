// Seleção de elementos
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-input");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

let oldInputValue;

// Funções
const saveTodo = (text) => {
    

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
    }
});

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

document.addEventListener("click", (e) => {
    const targetElement = e.target
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done");
    }

    if(targetElement.classList.contains("remove-todo")) {
        parentElement.remove();
    }

    if(targetElement.classList.contains("edit-todo")) {
        toggleForms();


        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }


})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms();
})