export default class Page {
  constructor({ makeElement, setEventListeners }) {
    this.makeElement = makeElement;
    // todo: rename setEventListeners to setUpPage
    this.setEventListeners = setEventListeners;
  }
}
