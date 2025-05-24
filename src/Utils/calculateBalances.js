// Calculate each member's balance based on payments
export function calculateBalances(payments, members) {
  const balances = {};
  members.forEach((m) => {
    const name = m.name || m.Name;
    balances[name] = 0;
  });

  payments.forEach((payment) => {
    if (!payment.splitAmong || payment.splitAmong.length === 0) return;
    const splitAmt = payment.price / payment.splitAmong.length;
    if (!(payment.payer in balances)) return; // skip if payer not in members
    balances[payment.payer] += Number(payment.price);
    payment.splitAmong.forEach((memberName) => {
      if (memberName in balances) {
        balances[memberName] -= splitAmt;
      }
    });
  });
  return balances;
}

export function minimizeCashFlow(balances) {
  const roundToTwo = (num) => Math.round(num * 100) / 100;
  const members = Object.keys(balances);
  const amounts = members.map((m) => roundToTwo(balances[m]));
  const transactions = [];

  function getMax(arr) {
    let maxIdx = 0;
    for (let i = 1; i < arr.length; i++) if (arr[i] > arr[maxIdx]) maxIdx = i;
    return maxIdx;
  }
  function getMin(arr) {
    let minIdx = 0;
    for (let i = 1; i < arr.length; i++) if (arr[i] < arr[minIdx]) minIdx = i;
    return minIdx;
  }

  function settle() {
    const mxCredit = getMax(amounts);
    const mxDebit = getMin(amounts);

    if (Math.abs(amounts[mxCredit]) < 0.01 && Math.abs(amounts[mxDebit]) < 0.01)
      return;

    const minAmt = roundToTwo(Math.min(-amounts[mxDebit], amounts[mxCredit]));
    amounts[mxCredit] -= minAmt;
    amounts[mxDebit] += minAmt;

    transactions.push({
      from: members[mxDebit],
      to: members[mxCredit],
      amount: minAmt,
    });

    settle();
  }

  settle();
  return transactions;
}
