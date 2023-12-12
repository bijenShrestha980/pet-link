import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return children ? children : <Outlet />;
}
