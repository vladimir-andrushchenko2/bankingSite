import { months } from '../utils/parseDate';

import sumOfIncomeAndSpendingInArrFromClosesMonths from './utils';

export default function fillBarChart(barChart, transactions, accountId) {
  const bars = Array.from(barChart.querySelectorAll('.bar')).reverse();
  const yMax = barChart.querySelector('.y-max');
  const yMin = barChart.querySelector('.y-start');
  const xMarks = Array.from(barChart.querySelectorAll('.x-mark'));

  const incomesAndSpendings = sumOfIncomeAndSpendingInArrFromClosesMonths({
    transactions,
    accountId,
  });

  const moneyBalanceEachMonths = incomesAndSpendings.map(
    ({ income, spending }) => income - spending
  );

  const [minBalance, maxBalance] = [
    Math.round(Math.min(...moneyBalanceEachMonths)),
    Math.round(Math.max(...moneyBalanceEachMonths)),
  ];

  const percentHeights = moneyBalanceEachMonths.map((value) =>
    value > 0 ? Math.round((maxBalance / (value - minBalance)) * 100) : 0
  );

  bars.forEach((bar, index) => {
    bar.style.height = `${percentHeights[index]}%`;
  });

  yMax.textContent = maxBalance;
  yMin.textContent = minBalance;

  const currMonthsIndex = new Date().getMonth();
  xMarks.reverse().forEach((xMark, index) => {
    const temp = months.at(currMonthsIndex - index).slice(0, 3);
    xMark.textContent = temp;
  });
}
