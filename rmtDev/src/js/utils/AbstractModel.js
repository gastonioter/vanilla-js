
class AbstractModel {
  constructor() {
    this.observers = {};
  }

  subscribe(event, observer) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  unsubscribe(event, observer) {
    this.observers[event]?.find((obs) => obs === observer);
  }

  notify(event, data) {
    this.observers[event]?.forEach((observer) => observer.render(data));
  }
}

export default AbstractModel;
