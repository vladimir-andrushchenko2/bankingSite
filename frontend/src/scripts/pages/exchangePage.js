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

export default function exchangePage() {
  const page = getPageTemplate('exchange-page');
  const userCurrenciesList = page.querySelector('.users-currencies-list');

  api.getCurrencies().then((data) => {
    userCurrenciesList.innerHTML = Object.entries(data)
      .map(([code, { amount }]) => getCurrencyElement({ code, amount }))
      .join('');
  });

  return page;
}
