import Observable from "./Observable";

export default class TestModel extends Observable {
  todos: any[] = [];
  constructor() {
    super();
  }

  addTodo(todo: any) {
    this.todos.push(todo);
    this.notify(this.todos);
  }
  getInitialData() {
    this.todos = ["hello", "world", "good"];
    this.notify(this.todos);
  }
}
