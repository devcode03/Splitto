import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
// import NewGroup from "./Pages/NewGroup";
import NewGroup from "./Pages/NewGroup-v2";

import Group from "./Pages/Group";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddNewPayment from "./Pages/Payment";
import GroupList from "./Components/GroupList";
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
  // const [groups, setGroups] = useState(intialGroups);

  return (
    <Router>
      <div className=" mx-auto App">
        <Header reset />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route
              index
              element={
                <HomePage>
                  <GroupList />
                </HomePage>
              }
            />
            <Route path="newGroup" element={<NewGroup />} />
            <Route path="groupPage/:id" element={<Group />} />
            <Route path="addPayment/:id" element={<AddNewPayment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
