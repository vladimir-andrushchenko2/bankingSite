export default class App {
  constructor(root, pages) {
    this.pages = pages;
    this.root = root;
  }

  clearPage() {
    this.root.innerHTML = '';
  }

  loadPage(pageName) {
    this.clearPage();

    const { constructPageElement, setUpPage } = this.pages[pageName];

    this.root.append(constructPageElement());

    setUpPage();

    window.scroll(0, 0);
  }
}
