const calculateBalances = (payments, members) => {
  const balances = {};
  members.forEach((m) => {
    balances[m.Name] = 0;
  });

  payments.forEach((payment) => {
    const splitAmt = payment.price / payment.splitAmong.length;
    balances[payment.payer] += payment.price;
    payment.splitAmong.forEach((memberId) => {
      const member = members.find((m) => m.id === memberId);
      balances[member.Name] -= splitAmt;
    });
  });
  return balances;
};

// const calculateBalances = (payments, members) => {
//   const balances = {};

//   // Initialize balances
//   members.forEach((member) => {
//     balances[member] = 0;
//   });

//   // Step 1: Calculate balances based on payments
//   payments.forEach((payment) => {
//     const { payer, amount, sharedWith } = payment;
//     // const totalPeople = sharedWith.includes(payer)
//     //   ? sharedWith.length
//     //   : sharedWith.length + 1;
//     const share = amount / sharedWith.length;
//     // The payer pays the full amount, but gets reimbursed by others
//     balances[payer] += amount;
//     // Deduct the share from each member (including payer if needed)
//     sharedWith.forEach((friend) => {
//       balances[friend] -= share;
//     });

//     // If payer is not included in sharedWith, subtract their share as well
//     // if (!sharedWith.includes(payer)) {
//     //   balances[payer] -= share;
//     // }
//   });
//   return simplifyDebts(balances);
// };

// const simplifyDebts = (balances) => {
//   const creditors = [];
//   const debtors = [];

//   // Separate creditors and debtors
//   for (const person in balances) {
//     if (balances[person] > 0) {
//       creditors.push({ name: person, amount: balances[person] });
//     } else if (balances[person] < 0) {
//       debtors.push({ name: person, amount: -balances[person] });
//     }
//   }

//   const transactions = [];

//   // Simplify transactions
//   while (creditors.length && debtors.length) {
//     const creditor = creditors[0];
//     const debtor = debtors[0];

//     const minAmount = Math.min(creditor.amount, debtor.amount);

//     transactions.push({
//       from: debtor.name,
//       to: creditor.name,
//       amount: minAmount.toFixed(2),
//     });

//     creditor.amount -= minAmount;
//     debtor.amount -= minAmount;

//     if (creditor.amount === 0) creditors.shift();
//     if (debtor.amount === 0) debtors.shift();
//   }

//   return transactions;
// };

const payments = [
  { payer: "Alice", amount: 300, splitAmong: ["Bob", "Charlie", "Alice"] },
];

const members = ["Alice", "Bob", "Charlie"];

calculateBalances(payments, members);
