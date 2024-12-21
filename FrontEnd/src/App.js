import React from "react";
import { Route, Routes } from "react-router-dom";
import './assets/css/tailwind.css'
import './assets/css/materialdesignicons.min.css'


import Home from './pages/index/home'
import Details from './pages/index/details'
import Tours from './pages/index/tours'
import Contact from "./pages/index/contact";
import Login from "./pages/auth/login";
import SignupSuccess from "./pages/auth/signup-success";
import Signup from "./pages/auth/signup";
import Profile from "./pages/account/profile";
import Payment from "./pages/payment/payment";
import AuthWrapper from "./components/auth-wrapper";
import PaymentSuccess from "./pages/payment/payment-success";
import AboutUs from "./pages/index/about-us";
import Invoice from "./pages/account/invoice";
import Settings from "./pages/account/settings";
import Dashboard from "./pages/admin/Dashboard";
function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/tour-details/:id" element={<Details />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/signup-success"
        element={
          <AuthWrapper>
            <SignupSuccess />
          </AuthWrapper>
        } />
      <Route
        path="/profile"
        element={
          <AuthWrapper>
            <Profile />
          </AuthWrapper>
        } />
      <Route
        path="/payment"
        element={
          <AuthWrapper>
            <Payment />
          </AuthWrapper>
        }
      />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route
        path="/invoice"
        element={
          <AuthWrapper>
            <Invoice />
          </AuthWrapper>
        }
      />
      <Route
        path="/setting"
        element={
          <AuthWrapper>
            <Settings />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin"
        element={
            <Dashboard />
        }
      />
    </Routes>
  );
}

export default App;
