import { Todo, TodoList } from "./classes";
import "./styles.css";
import { crearTodo } from "./js/componentes";

export const todoList = new TodoList();

todoList.todos.forEach(crearTodo);
