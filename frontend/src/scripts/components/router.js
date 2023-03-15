export default class Router {
  constructor({ root, pages }) {
    this.pages = pages;
    this.root = root;
    this.elementsToPages = {};
  }

  clearPage() {
    this.root.innerHTML = '';
  }

  loadPage(pageName, payload, settings) {
    this.clearPage();

    const page = this.pages[pageName];

    this.root.append(page(this, payload, settings));

    window.scroll(0, 0);
  }
}
