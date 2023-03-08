import parseDate from '../utils/parseDate';

function getHistoryTableRowHTML({ from, to, amount, date }, accountId) {
  const isIncome = to === accountId;
  return `<tr class="table-row history-record">
  <td class="cell sender">${from}</td>
  <td class="cell receiver">${to}</td>
  <td class="cell amount-money"
   style="color: ${isIncome ? '#76CA66' : '#FD4E5D'}; ">
  ${isIncome ? '+' : '-'}
     ${amount}
      ₽</td >
  <td class="cell date">${parseDate(date)}</td>
</tr > `;
}

export default function fillHistoryTable(tableBody, transactions, accountId) {
  const lastTenTransactions = transactions.slice(-10).reverse();

  tableBody.innerHTML = lastTenTransactions
    .map((transaction) => getHistoryTableRowHTML(transaction, accountId))
    .join('');
}
