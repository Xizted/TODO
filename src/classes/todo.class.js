export class Todo {

  static fromJson({id,tarea,completed,date}){
    const tempTodo = new Todo(tarea);

    tempTodo.id = id;
    tempTodo.completed = completed;
    tempTodo.date = date;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;

    this.id = new Date().getTime();
    this.completed = false;
    this.date = new Date();
  }
}
