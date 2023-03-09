import getPageTemplate from '../utils/getPageTemplate';
import api from '../components/api';

function getCurrencyElement({ code, amount }) {
  return `<li class="item-row">
  <span class="currency-name">${code}</span>
  <span class="dots"></span>
  <span class="price">${amount}</span>
</li>
  `;
}

function getCurrencyDynamicElement({ from, to, rate, change }) {
  const element = document
    .getElementById('exchange-rate-change-item')
    .content.querySelector('.item-row')
    .cloneNode(true);

  element.querySelector('.currency-name').textContent = `${from}/${to}`;
  element.querySelector('.price').textContent = rate;

  const changeIndicatorClassName = change > 0 ? 'green' : 'red';

  element.querySelector('.triangle').classList.add(changeIndicatorClassName);

  return element;
}

class FixedSizeArrayOfElements {
  constructor(container) {
    this.elements = [];
    this.container = container;
  }

  add(element) {
    if (this.elements.length > 15) {
      const removedElement = this.elements.pop();
      removedElement.remove();
    }

    this.elements.unshift(element);
    this.container.prepend(element);
  }
}

function getCurrencyFeed() {
  const path = 'ws://localhost:3000/currency-feed';

  return new WebSocket(path);
}

function insertOptionsToSelect(select, options) {
  select.innerHTML = options
    .map((value) => `<option value="${value}">${value}</option>`)
    .join('');
}

export default function exchangePage() {
  const page = getPageTemplate('exchange-page');
  const userCurrenciesList = page.querySelector('.users-currencies-list');
  const exchangeRatesList = page.querySelector('.currency-changes-list');

  const currencySelects = Array.from(page.querySelectorAll('.currency-select'));

  const fixedArray = new FixedSizeArrayOfElements(exchangeRatesList);

  api.getCurrencies().then((data) => {
    userCurrenciesList.innerHTML = Object.entries(data)
      .map(([code, { amount }]) => getCurrencyElement({ code, amount }))
      .join('');
  });

  const ws = getCurrencyFeed();

  ws.onmessage = (event) => {
    const { from, to, rate, change } = JSON.parse(event.data);

    const item = getCurrencyDynamicElement({ from, to, rate, change });

    fixedArray.add(item);
  };

  api.getCurrenciesNames().then((data) => {
    currencySelects.forEach((select) => {
      insertOptionsToSelect(select, data);
    });
  });

  return page;
}
