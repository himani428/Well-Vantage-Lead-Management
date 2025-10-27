// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadDetail from "./pages/LeadDetail";
import Blank from "./pages/Blank";
import LoggedOut from "./pages/LoggedOut";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { seedIfEmpty } from "./data";
import "./styles.css";

function Shell({ children }) {
  const { pathname } = useLocation();
  const hideChrome = pathname === "/login" || pathname === "/signup";
  return (
    <div className="app">
      {!hideChrome && <Sidebar />}
      <div className="app-main">{children}</div>
    </div>
  );
}

export default function App() {
  useEffect(() => seedIfEmpty(), []);
  return (
    <AuthProvider>
      <Shell>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route path="/" element={<Navigate to="/leads" />} />
          <Route path="/leads" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/lead/:id" element={<ProtectedRoute><LeadDetail /></ProtectedRoute>} />

          {/* Other placeholders (protected) */}
          <Route path="/wv-leads" element={<ProtectedRoute><Blank title="WellVantage Leads" /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><Blank title="Member Management" /></ProtectedRoute>} />
          <Route path="/membership" element={<ProtectedRoute><Blank title="Membership Management" /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Blank title="Attendance Tracking" /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><Blank title="Employee Management" /></ProtectedRoute>} />
          <Route path="/revenue" element={<ProtectedRoute><Blank title="Revenue Management" /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><Blank title="Expense Management & Profit" /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute><Blank title="Workout Management" /></ProtectedRoute>} />

          {/* Logout page */}
          <Route path="/logout" element={<LoggedOut />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/leads" replace />} />
        </Routes>
      </Shell>
    </AuthProvider>
  );
}
