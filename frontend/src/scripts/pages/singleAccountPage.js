import api from '../components/api';
import getPageTemplate from '../utils/getPageTemplate';
import fillBarChart from '../fillElementWithData/fillBarChart';
import fillHistoryTable from '../fillElementWithData/fillHistoryTable';
import handleHistory from '../utils/handleHistory';

export default function singleAccountPage(
  router,
  accountId,
  { historyOption } = { historyOption: 'push' }
) {
  handleHistory(historyOption, `/account/${accountId}`);

  const page = getPageTemplate('account-page');
  const idDisplay = page.querySelector('.account-id');
  const balanceDisplay = page.querySelector('.balance');
  const smallBarChart = page.querySelector('.small-bar-chart');
  const historyTableBody = page.querySelector('.table-body');
  const makeTransferForm = page.querySelector('.make-transfer-form');

  page.querySelector('.go-back-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });

  makeTransferForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const receiverInput = makeTransferForm.querySelector(
      '#receiver-account-number'
    );

    const errorDisplay = makeTransferForm.querySelector('.error-display');

    const amount = makeTransferForm.querySelector('#transfer-money-amount');

    api
      .postTransferFunds({
        from: accountId,
        to: receiverInput.value,
        amount: amount.value,
      })
      .then(() => {
        router.loadPage('account', accountId);
      })
      .catch((err) => {
        errorDisplay.textContent = err;
      });
  });

  api
    .getAccount({ id: accountId })
    .then(({ account, balance, transactions }) => {
      idDisplay.textContent = account;
      balanceDisplay.textContent = `${balance} ₽`;

      fillBarChart(smallBarChart, transactions, accountId);

      fillHistoryTable(historyTableBody, transactions, accountId);

      page.querySelector('.history').addEventListener('click', () => {
        router.loadPage('history', accountId);
      });
    });

  return page;
}
