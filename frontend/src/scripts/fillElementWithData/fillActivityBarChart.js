import { months } from '../utils/parseDate';

import sumOfIncomeAndSpendingInArrFromClosesMonths from './utils';

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

  const incomeEachMonth = incomesAndSpendings.map(({ income }) => income);

  const [minIncome, maxIncome] = [
    Math.round(Math.min(...incomeEachMonth)),
    Math.round(Math.max(...incomeEachMonth)),
  ];

  const percentHeightsOfIncome = incomeEachMonth.map((value) =>
    value > 0 ? Math.round((maxIncome / (value - minIncome)) * 100) : 0
  );

  bars.forEach((bar, index) => {
    bar.style.height = `${percentHeightsOfIncome[index]}%`;
  });

  yMax.textContent = maxIncome;
  yMin.textContent = minIncome;

  const currMonthsIndex = new Date().getMonth();
  xMarks.reverse().forEach((xMark, index) => {
    const temp = months.at(currMonthsIndex - index).slice(0, 3);
    xMark.textContent = temp;
  });

  const spendingPercentHeights = incomesAndSpendings.map(
    ({ income, spending }) => Math.round((spending / income) * 100)
  );

  spendingBars.forEach((bar, index) => {
    bar.style.height = `${spendingPercentHeights[index]}%`;
  });
}
