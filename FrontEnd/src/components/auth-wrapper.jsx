import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const AuthWrapper = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    console.log("Role:", userRole);

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/404" replace />;
    }

  } catch (error) {
    console.error("Invalid Token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthWrapper;
