const observerMixin = {
  observers: {},

  addObserver(event, obs) {
    this.observers[event] = this.observers[event]
      ? this.observers[event].push(obs)
      : [obs];
  },

  removeObserver(event, obs) {
    this.observers[event] = this.observers[event]?.filter((o) => obs === o);
  },

  notify(event) {
    this.observers[event].forEach((obs) => {
      obs();
    });
  },
};

export default observerMixin