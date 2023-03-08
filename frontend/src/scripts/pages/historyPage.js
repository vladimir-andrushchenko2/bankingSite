import getPageTemplate from '../utils/getPageTemplate';
import fillBarChart from '../fillElementWithData/fillBarChart';
import fillHistoryTable from '../fillElementWithData/fillHistoryTable';

export default function historyPage(
  router,
  { transactions, accountId, balance }
) {
  const page = getPageTemplate('history-page');
  const barCharts = page.querySelectorAll('.bar-chart-balance-wrapper');
  const historyTableBody = page.querySelector('.table-body');
  const idDisplay = page.querySelector('.account-id');
  const balanceDisplay = page.querySelector('.balance');

  page.querySelector('.go-back-link').addEventListener('click', (event) => {
    event.preventDefault();
    router.loadPage('account', accountId);
  });

  idDisplay.textContent = accountId;
  balanceDisplay.textContent = `${balance} ₽`;

  barCharts.forEach((barChart) => {
    fillBarChart(barChart, transactions, accountId);
  });

  fillHistoryTable(historyTableBody, transactions, accountId);

  return page;
}
