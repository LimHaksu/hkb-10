export default class Observable {
  private observers: Map<String, Function> = new Map();

  constructor() {}

  subscribe(key: String, callback: Function) {
    this.observers.set(key, callback);
  }

  unsubscribe(key: String) {
    this.observers.delete(key);
  }

  notify(data: any) {
    this.observers.forEach((callback) => callback(data));
  }
}
