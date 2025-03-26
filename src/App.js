import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
// import NewGroup from "./pages/NewGroup";
import NewGroup from "./pages/NewGroup-v2";

import Group from "./pages/Group";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddNewPayment from "./pages/Payment";
import GroupList from "./components/GroupList";

const intialGroups = [
  {
    groupID: "73aaefec-b8be-4260-bb97-83a32d91e0fe",
    name: "test",
    currency: "$",
    createDt: "03/25",
    members: [
      { id: "LgZk41Tc", name: "q" },
      { id: "nJBgFer0", name: "sa" },
    ],
    payments: [
      {
        date: "03/25",
        id: "28f77dd9-f7b8-4eec-9bfd-6d91f0520c1f",
        payer: "q",
        paymentOf: "ass",
        price: 1000,
        splitAmong: ["q", "sa"],
      },
    ],
  },
  {
    groupID: "73aaefec-b8be-4260-bb97-83a32d91e0as",
    name: "test2",
    currency: "$",
    createDt: "03/25",
    members: [
      { id: "LgZk41Tc", name: "q" },
      { id: "nJBgFer0", name: "sa" },
    ],
    payments: [
      {
        date: "03/25",
        id: "28f77dd9-f7b8-4eec-9bfd-6d91f0520c1f",
        payer: "q",
        paymentOf: "ass",
        price: 1000,
        splitAmong: ["q", "sa"],
      },
    ],
  },
  {
    groupID: "73aaefec-b8be-4260-bb97-83a32d91e011",
    name: "test3",
    currency: "$",
    createDt: "03/25",
    members: [
      { id: "LgZk41Tc", name: "q" },
      { id: "nJBgFer0", name: "sa" },
    ],
    payments: [
      {
        date: "03/25",
        id: "28f77dd9-f7b8-4eec-9bfd-6d91f0520c1f",
        payer: "q",
        paymentOf: "ass",
        price: 1000,
        splitAmong: ["q", "sa"],
      },
    ],
  },
  {
    groupID: "73aaefec-b8be-4260-bb97-83a32d91eassas",
    name: "test4",
    currency: "$",
    createDt: "03/25",
    members: [
      { id: "LgZk41Tc", name: "q" },
      { id: "nJBgFer0", name: "sa" },
    ],
    payments: [
      {
        date: "03/25",
        id: "28f77dd9-f7b8-4eec-9bfd-6d91f0520c1f",
        payer: "q",
        paymentOf: "ass",
        price: 1000,
        splitAmong: ["q", "sa"],
      },
    ],
  },
];

export default function App() {
  const [groups, setGroups] = useState([]);
  // const [groups, setGroups] = useState(intialGroups);

  const calculateBalances = (payments, members) => {
    const balances = {};
    members.forEach((m) => {
      balances[m.name] = 0;
    });
    payments.forEach((payment) => {
      const splitAmt = payment.price / payment.splitAmong.length;
      balances[payment.payer] += payment.price;
      payment.splitAmong.forEach((mamberName) => {
        balances[mamberName] -= splitAmt;
      });
    });
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

  // const balances = calculateBalances(payments, members);
  // const transactions = settleDebts(balances);

  return (
    <Router>
      <div className=" mx-auto App">
        <Header reset />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route
              index
              element={
                <HomePage groups={groups}>
                  {groups.length > 0 && <GroupList groups={groups} />}
                </HomePage>
              }
            />
            <Route
              path="newGroup"
              element={<NewGroup setGroups={setGroups} />}
            />
            <Route
              path="groupPage/:id"
              element={
                <Group
                  groups={groups}
                  calculateBalances={calculateBalances}
                  settleDebts={settleDebts}
                />
              }
            />
            <Route
              path="addPayment/:id"
              element={<AddNewPayment groups={groups} setGroups={setGroups} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
