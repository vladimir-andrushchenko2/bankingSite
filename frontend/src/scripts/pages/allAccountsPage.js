import getPageTemplate from '../utils/getPageTemplate';
import getTemplate from '../utils/getTemplate';
import api from '../components/api';
import parseDate from '../utils/parseDate';

function makeCard({ account, balance, transactions }, router) {
  const card = getTemplate('account-card-template', '.account-card');

  card.querySelector('.account-id').textContent = account;
  card.querySelector('.account-balance').textContent = `${balance} ₽`;

  if (transactions[0]?.date) {
    const { date } = transactions[0];
    card.querySelector('.account-last-use-date').textContent = parseDate(date);
  }

  card
    .querySelector('.account-open-link')
    .addEventListener('click', (event) => {
      event.preventDefault();
      router.loadPage('account', account);
    });

  return card;
}

function getTime(account) {
  const jsonDate = account.transactions[0]?.date;

  if (jsonDate) {
    return new Date(jsonDate).getTime();
  }

  return Number.POSITIVE_INFINITY;
}

export default function allAccountsPage(
  router,
  { cachedAccounts, sortedOption } = {}
) {
  const page = getPageTemplate('accounts-page');
  const accountsList = page.querySelector('.accounts-list');
  const sortSelect = page.querySelector('.sort-select');

  if (sortedOption) {
    sortSelect.querySelector(`option[value='${sortedOption}'`).selected =
      'selected';
  }

  if (!cachedAccounts) {
    api.getAccounts().then((accounts) => {
      router.loadPage('accounts', { cachedAccounts: accounts });
    });

    // return empty page while accounts are loading
    return page;
  }

  cachedAccounts.forEach(({ account, balance, transactions }) => {
    accountsList.append(makeCard({ account, balance, transactions }, router));
  });

  sortSelect.addEventListener('change', ({ target: { value } }) => {
    switch (value) {
      case 'id':
        cachedAccounts.sort((left, right) => left.account - right.account);
        break;

      case 'money':
        cachedAccounts.sort((left, right) => right.balance - left.balance);
        break;

      case 'time-used':
        cachedAccounts.sort((left, right) => getTime(left) - getTime(right));
        break;

      default:
        break;
    }

    router.loadPage('accounts', {
      cachedAccounts,
      sortedOption: value,
    });
  });

  page.querySelector('.add-account-btn').addEventListener('click', () => {
    api.postCreateAccount().then(() => {
      router.loadPage('accounts');
    });
  });

  return page;
}
