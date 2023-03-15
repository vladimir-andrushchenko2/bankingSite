import getPageTemplate from '../utils/getPageTemplate';
import fillBarChart from '../fillElementWithData/fillBarChart';
import fillHistoryTable from '../fillElementWithData/fillHistoryTable';
import fillActivityBarChart from '../fillElementWithData/fillActivityBarChart';
import api from '../components/api';
import handleHistory from '../utils/handleHistory';

export default function historyPage(
  router,
  accountId,
  { historyOption } = { historyOption: 'push' }
) {
  handleHistory(historyOption, `/history/${accountId}`);

  const page = getPageTemplate('history-page');
  const barChart = page.querySelector(
    '.bar-chart-balance-wrapper.balance-dynamic'
  );
  const actitityBarChart = page.querySelector(
    '.bar-chart-balance-wrapper.diff'
  );
  const historyTableBody = page.querySelector('.table-body');
  const idDisplay = page.querySelector('.account-id');
  const balanceDisplay = page.querySelector('.balance');

  page.querySelector('.go-back-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });

  idDisplay.textContent = accountId;

  api.getAccount({ id: accountId }).then(({ transactions, balance }) => {
    balanceDisplay.textContent = `${balance} ₽`;

    fillBarChart(barChart, transactions, accountId);
    fillActivityBarChart(actitityBarChart, transactions, accountId);

    fillHistoryTable(historyTableBody, transactions, accountId);
  });

  return page;
}
