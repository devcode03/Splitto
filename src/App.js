import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NewGroup from "./pages/NewGroup";
import Group from "./pages/Group";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddNewPayment from "./pages/Payment";

const intialMembers = [
  { Name: "Prerana", id: 1 },
  { Name: "Ayush", id: 2 },
  { Name: "Pranav", id: 3 },
];

const date = new Date();
const formattedDate = date.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
});

const intialPayments = [
  {
    payer: "Prerana",
    paymentOf: "ABC",
    price: 3000,
    splitAmong: ["Ayush", "Pranav"],
    date: formattedDate,
  },
  {
    payer: "Ayush",
    paymentOf: "test2",
    price: 5000,
    splitAmong: ["Prerana", "Pranav"],
    date: formattedDate,
  },
];

const intialGroupName = "Manali";

export default function App() {
  const [members, setMembers] = useState([]);
  const [currency, setCurrency] = useState("");
  const [group, setGroup] = useState("");
  const [payments, setPayments] = useState([]);

  const calculateBalances = (payments, members) => {
    const balances = {};
    members.forEach((m) => {
      balances[m.Name] = 0;
    });
    console.log(payments);
    payments.forEach((payment) => {
      const splitAmt = payment.price / payment.splitAmong.length;
      console.log(splitAmt);
      balances[payment.payer] += payment.price;
      payment.splitAmong.forEach((mamberName) => {
        balances[mamberName] -= splitAmt;
      });
    });
    console.log(balances);
    return balances;
  };

  const settleDebts = (balances) => {
    const roundToTwo = (num) => Math.round(num * 100) / 100;
    const debtors = [];
    const creditors = [];

    for (const [member, balance] of Object.entries(balances)) {
      if (balance < 0) {
        debtors.push({ member, balance: -balance });
      } else if (balance > 0) {
        creditors.push({ member, balance });
      }
    }
    const transactions = [];

    //settle debts
    while (debtors.length && creditors.length) {
      const debtor = debtors[0];
      const creditor = creditors[0];

      const settlementAmt = roundToTwo(
        Math.min(debtor.balance, creditor.balance)
      );
      if (settlementAmt < 0.01) {
        debtors.shift();
        creditors.shift();
        continue;
      }
      if (settlementAmt > 0.01) {
        transactions.push({
          from: debtor.member,
          to: creditor.member,
          amount: settlementAmt,
        });
      }
      debtor.balance = roundToTwo(debtor.balance - settlementAmt);
      creditor.balance = roundToTwo(creditor.balance - settlementAmt);
      if (debtor.balance <= 0.01) debtors.shift();
      if (creditor.balance <= 0.01) creditors.shift();
    }
    return transactions;
  };
  const balances = calculateBalances(payments, members);
  const transactions = settleDebts(balances);
  return (
    <Router>
      <div className=" mx-auto App">
        <Header />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/new-group"
              element={
                <NewGroup
                  GroupName={group}
                  setGroupName={setGroup}
                  members={members}
                  setMembers={setMembers}
                  currency={currency}
                  setCurrency={setCurrency}
                />
              }
            />
            <Route
              path="/groupPage"
              element={
                <Group
                  members={members}
                  group={group}
                  payments={payments}
                  transactions={transactions}
                  currency={currency}
                />
              }
            />
            <Route
              path="/payment/new"
              element={
                <AddNewPayment
                  members={members}
                  payments={payments}
                  setPayments={setPayments}
                  currency={currency}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
