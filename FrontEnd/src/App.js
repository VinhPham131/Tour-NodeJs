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
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import Error from "./pages/special/404";
import { Navigate } from "react-router-dom";
function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/tour-details/:id" element={<Details />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/404" element={<Error />} />
      <Route
        path="/signup-success"
        element={
          <AuthWrapper allowedRoles={['user']}>
            <SignupSuccess />
          </AuthWrapper>
        } />
      <Route
        path="/profile"
        element={
          <AuthWrapper allowedRoles={['user']}>
            <Profile />
          </AuthWrapper>
        } />
      <Route
        path="/payment"
        element={
          <AuthWrapper allowedRoles={['user']}>
            <Payment />
          </AuthWrapper>
        }
      />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route
        path="/invoice"
        element={
          <AuthWrapper allowedRoles={['user']}>
            <Invoice />
          </AuthWrapper>
        }
      />
      <Route
        path="/setting"
        element={
          <AuthWrapper allowedRoles={['user']}>
            <Settings />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthWrapper allowedRoles={['admin']}>
            <Dashboard />
          </AuthWrapper>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
