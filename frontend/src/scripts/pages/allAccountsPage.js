import getPageTemplate from '../utils/getPageTemplate';
import getTemplate from '../utils/getTemplate';
import api from '../components/api';
import parseDate from '../utils/parseDate';

export default function allAccountsPage(router) {
  const page = getPageTemplate('accounts-page');
  const accountsList = page.querySelector('.accounts-list');

  api.getAccounts().then((accounts) => {
    accounts.forEach(({ account, balance, transactions }) => {
      const card = getTemplate('account-card-template', '.account-card');

      card.querySelector('.account-id').textContent = account;
      card.querySelector('.account-balance').textContent = `${balance} ₽`;

      if (transactions[0]?.date) {
        const { date } = transactions[0];
        card.querySelector('.account-last-use-date').textContent =
          parseDate(date);
      }

      card
        .querySelector('.account-open-link')
        .addEventListener('click', (event) => {
          event.preventDefault();
          router.loadPage('account', account);
        });

      accountsList.append(card);
    });
  });

  page.querySelector('.add-account-btn').addEventListener('click', () => {
    api.postCreateAccount().then(() => {
      router.loadPage('accounts');
    });
  });

  return page;
}
