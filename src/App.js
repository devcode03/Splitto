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
import EditGroup from "./Pages/EditGroup";
import FAQ from "./Components/FAQ";
import Contact from "./Components/Contact";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import Terms from "./Components/TermsAndConditions";
import About from "./Components/AboutUs";

export default function App() {
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
            <Route path="newGroup/:id/edit" element={<EditGroup />} />
            <Route path="addPayment/:id" element={<AddNewPayment />} />
            <Route path="addPayment/:id/edit" element={<AddNewPayment />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
