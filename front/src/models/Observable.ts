export interface TypeObservable {
  subscribe: (key: string, callback: Function) => void;
  unsubscribe: (key: string) => void;
  nofity: (data: any) => void;
}

export default class Observable {
  private observers: Map<string, Function> = new Map();

  constructor() {}

  subscribe(key: string, callback: Function) {
    this.observers.set(key, callback);
  }

  unsubscribe(key: string) {
    this.observers.delete(key);
  }

  notify(data: any) {
    this.observers.forEach((callback) => callback(data));
  }
}
