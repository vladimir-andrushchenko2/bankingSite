function diffInMonths(date1, date2) {
  const monthsDiff = (date2.getFullYear() - date1.getFullYear()) * 12;
  const diff = date2.getMonth() - date1.getMonth();
  return monthsDiff + diff;
}

function isIncomingTransaction({ transaction, accountId }) {
  return transaction.to === accountId;
}

export default function sumOfIncomeAndSpendingInArrFromClosesMonths({
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
