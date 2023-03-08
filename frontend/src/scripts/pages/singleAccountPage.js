import api from '../components/api';
import getPageTemplate from '../utils/getPageTemplate';

function diffInMonths(date1, date2) {
  const months = (date2.getFullYear() - date1.getFullYear()) * 12;
  const diff = date2.getMonth() - date1.getMonth();
  return months + diff;
}

function isIncomingTransaction({ transaction, accountId }) {
  return transaction.to === accountId;
}

function parseTransactionsData({ transactions, accountId }) {
  const MONTHS_OF_DATA = 12;

  const currentDate = new Date();

  const output = Array(12)
    .fill({})
    .map(() => ({ income: 0, spending: 0 }));

  transactions.forEach((transaction) => {
    const diff = diffInMonths(new Date(transaction.date), currentDate);

    if (diff < MONTHS_OF_DATA) {
      if (isIncomingTransaction({ transaction, accountId })) {
        output[diff].income += transaction.amount;
      } else {
        output[diff].spending += transaction.amount;
      }
    }
  });

  return output;
}

function fillGraph(barChart, transactions) {
  const bars = Array.from(barChart.querySelectorAll('.bar')).reverse();
  const yMax = barChart.querySelector('.y-max');
  const yMin = barChart.querySelector('.y-start');

  const totalTransactions = transactions.map(
    ({ income, spending }) => income + spending
  );

  const [minTotalTransaction, maxTotalTransaction] = [
    Math.floor(Math.min(...totalTransactions)),
    Math.floor(Math.max(...totalTransactions)),
  ];

  const percentHeights = totalTransactions.map((value) =>
    value > 0
      ? Math.floor((maxTotalTransaction / (value - minTotalTransaction)) * 100)
      : 0
  );

  bars.forEach((bar, index) => {
    bar.style.height = `${percentHeights[index]}%`;
  });

  yMax.textContent = maxTotalTransaction;
  yMin.textContent = minTotalTransaction;
}

export default function singleAccountPage(router, accountId) {
  const page = getPageTemplate('account-page');
  const idDisplay = page.querySelector('.account-id');
  const balanceDisplay = page.querySelector('.balance');
  const smallBarChart = page.querySelector('.small-bar-chart');

  api
    .getAccount({ id: accountId })
    .then(({ account, balance, transactions }) => {
      idDisplay.textContent = account;
      balanceDisplay.textContent = `${balance} ₽`;

      // last 12 months
      const recentTransactionsWithIncomeAndSpendingSeparated =
        parseTransactionsData({
          transactions,
          accountId,
        });

      fillGraph(
        smallBarChart,
        recentTransactionsWithIncomeAndSpendingSeparated
      );
    });

  return page;
}
