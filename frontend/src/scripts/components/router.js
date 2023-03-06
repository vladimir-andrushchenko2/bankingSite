export default class Router {
  constructor({ root, pages }) {
    this.pages = pages;
    this.root = root;
    this.elementsToPages = {};
  }

  clearPage() {
    this.root.innerHTML = '';
  }

  loadPage(pageName) {
    this.clearPage();

    const page = this.pages[pageName];

    this.root.append(page.makeElement());

    page.setEventListeners();

    window.scroll(0, 0);
  }

  setClickOnElementWithClassToLeadTo({ className, pageName }) {
    if (!(pageName in this.pages)) {
      throw new Error(
        `no ${pageName} page in available ${Object.keys(this.pages).join(' ')}`
      );
    }

    this.elementsToPages[className] = pageName;

    return this;
  }

  setEventListeners() {
    document.body.addEventListener('click', (event) => {
      const { target } = event;

      const matchedClasses = [...target.classList].filter(
        (className) => className in this.elementsToPages
      );

      if (matchedClasses.length === 0) {
        return;
      }

      // if element has been dedicated to load some page which is already satisfies
      // and is an Anchor tag
      // preventDefault();
      if (target.tagName === 'A') {
        event.preventDefault();
      }

      if (matchedClasses.length === 1) {
        this.loadPage(this.elementsToPages[matchedClasses[0]]);
        return;
      }

      const mathedPages = matchedClasses
        .map(
          (className) => `${className} -> ${this.elementsToPages[className]}`
        )
        .join('\n');

      const errMsg = `
      element matched classes: ${matchedClasses.join(', ')}
      that lead to pages ${mathedPages}
      `;

      throw new Error(errMsg);
    });
  }
}
