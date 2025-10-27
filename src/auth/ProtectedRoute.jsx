// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) return null; // could show a loader if you want
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
