import api from '../components/api';
import getPageTemplate from '../utils/getPageTemplate';
import fillBarChart from '../fillElementWithData/fillBarChart';
import fillHistoryTable from '../fillElementWithData/fillHistoryTable';

export default function singleAccountPage(router, accountId) {
  const page = getPageTemplate('account-page');
  const idDisplay = page.querySelector('.account-id');
  const balanceDisplay = page.querySelector('.balance');
  const smallBarChart = page.querySelector('.small-bar-chart');
  const historyTableBody = page.querySelector('.table-body');

  api
    .getAccount({ id: accountId })
    .then(({ account, balance, transactions }) => {
      idDisplay.textContent = account;
      balanceDisplay.textContent = `${balance} ₽`;

      fillBarChart(smallBarChart, transactions, accountId);

      fillHistoryTable(historyTableBody, transactions, accountId);
    });

  page.querySelector('.history').addEventListener('click', () => {
    router.loadPage('history', {});
  });

  return page;
}
