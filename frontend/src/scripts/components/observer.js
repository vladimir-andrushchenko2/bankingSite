export default class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  dispatch(payload) {
    this.subscribers.forEach((subscriber) => {
      subscriber(payload);
    });
  }
}
