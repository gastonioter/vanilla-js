class AbstractModel {
  constructor() {
    this.observers = {};
  }

  subscribe(event, listnerFn) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(listnerFn);
  }

  unsubscribe(event, listnerFn) {
    this.observers[event]?.find((listener) => listener === listnerFn);
  }

  notify(event, data) {
    this.observers[event]?.forEach((listnerFn) => listnerFn(data));
  }
}

export default AbstractModel;
