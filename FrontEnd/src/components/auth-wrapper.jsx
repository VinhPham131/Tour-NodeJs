import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem("token"); // Check token from localStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthWrapper;
