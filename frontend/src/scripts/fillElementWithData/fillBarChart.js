import { months } from '../utils/parseDate';

function diffInMonths(date1, date2) {
  const monthsDiff = (date2.getFullYear() - date1.getFullYear()) * 12;
  const diff = date2.getMonth() - date1.getMonth();
  return monthsDiff + diff;
}

function isIncomingTransaction({ transaction, accountId }) {
  return transaction.to === accountId;
}

function sumOfIncomeAndSpendingInArrFromClosesMonths({
  transactions,
  accountId,
}) {
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

export default function fillBarChart(barChart, transactions, accountId) {
  const bars = Array.from(barChart.querySelectorAll('.bar')).reverse();
  const spendingBars = Array.from(
    barChart.querySelectorAll('.spending')
  ).reverse();
  const yMax = barChart.querySelector('.y-max');
  const yMin = barChart.querySelector('.y-start');
  const xMarks = Array.from(barChart.querySelectorAll('.x-mark'));

  const incomesAndSpendings = sumOfIncomeAndSpendingInArrFromClosesMonths({
    transactions,
    accountId,
  });

  const totalTransactions = incomesAndSpendings.map(
    ({ income, spending }) => income + spending
  );

  const [minTotalTransaction, maxTotalTransaction] = [
    Math.round(Math.min(...totalTransactions)),
    Math.round(Math.max(...totalTransactions)),
  ];

  const percentHeights = totalTransactions.map((value) =>
    value > 0
      ? Math.round((maxTotalTransaction / (value - minTotalTransaction)) * 100)
      : 0
  );

  bars.forEach((bar, index) => {
    bar.style.height = `${percentHeights[index]}%`;
  });

  yMax.textContent = maxTotalTransaction;
  yMin.textContent = minTotalTransaction;

  const currMonthsIndex = new Date().getMonth();
  xMarks.reverse().forEach((xMark, index) => {
    const temp = months.at(currMonthsIndex - index).slice(0, 3);
    xMark.textContent = temp;
  });

  if (spendingBars.length > 0) {
    const spendingPercentHeights = incomesAndSpendings
      .map(({ spending }) => spending)
      .map((value) =>
        value > 0
          ? Math.round(
            (maxTotalTransaction / (value - minTotalTransaction)) * 100
          )
          : 0
      );

    spendingBars.forEach((bar, index) => {
      bar.style.height = `${spendingPercentHeights[index]}%`;
    });
  }
}