import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import PrivateRoute from "./Components/PrivateRoute";
import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";

// Lazy load route components for better code splitting
const HomePage = lazy(() => import("./Pages/HomePage"));
const NewGroup = lazy(() => import("./Pages/NewGroup-v2"));
const Group = lazy(() => import("./Pages/Group"));
const AddNewPayment = lazy(() => import("./Pages/Payment"));
const GroupList = lazy(() => import("./Components/GroupList"));
const EditGroup = lazy(() => import("./Pages/EditGroup"));
const FAQ = lazy(() => import("./Components/FAQ"));
const Contact = lazy(() => import("./Components/Contact"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const Terms = lazy(() => import("./Components/TermsAndConditions"));
const About = lazy(() => import("./Components/AboutUs"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className=" mx-auto App">
          <Header reset />
          <div style={{ minHeight: "80vh" }}>
            <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
              <Routes>
                {/* Public Routes */}
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="about" element={<About />} />

                {/* Protected Routes */}
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <GroupList />
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="newGroup"
                  element={
                    <PrivateRoute>
                      <NewGroup />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="groupPage/:id"
                  element={
                    <PrivateRoute>
                      <Group />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="newGroup/:id/edit"
                  element={
                    <PrivateRoute>
                      <EditGroup />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="addPayment/:id"
                  element={
                    <PrivateRoute>
                      <AddNewPayment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="addPayment/:id/edit"
                  element={
                    <PrivateRoute>
                      <AddNewPayment />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
