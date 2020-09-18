import { Todo } from "../classes/";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnDelCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const boxFilters = document.querySelectorAll(".filtro");

export const crearTodo = (todo) => {
  const htmlTodo = `<li class="${todo.completed ? "completed" : ""}" data-id="${
    todo.id
  }">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completed ? "checked" : ""
        }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
  </li> `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

//Events

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value != "") {
    const newTodo = new Todo(txtInput.value);
    todoList.newTodo(newTodo);
    crearTodo(newTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const element = event.target.localName; // Input, Button, Label
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (element.includes("input")) {
    todoList.togglerTodo(todoId);
    todoElement.classList.toggle("completed");
  } else if (element.includes("button")) {
    todoList.deleteTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnDelCompleted.addEventListener("click", () => {
  todoList.deleteCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i];
    if (element.classList.contains("completed")) {
      divTodoList.removeChild(element);
    }
  }
});

ulFilters.addEventListener("click", (event) => {
  const filter = event.target.text;

  boxFilters.forEach((element) => {
    element.classList.remove("selected");
  });

  event.target.classList.add("selected");

  if (filter != undefined) {
    for (const element of divTodoList.children) {
      element.classList.remove("hidden");
      const completed = element.classList.contains("completed");

      switch (filter) {
        case "Pendientes":
          if (completed) {
            element.classList.add("hidden");
          }
          break;
        case "Completados":
          if (!completed) {
            element.classList.add("hidden");
          }
          break;
      }
    }
  }
});
