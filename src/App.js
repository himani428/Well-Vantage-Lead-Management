import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LeadDetail from "./pages/LeadDetail";
import Blank from "./pages/Blank";
import LoggedOut from "./pages/LoggedOut";
import { seedIfEmpty } from "./data";
import "./styles.css";

export default function App() {
  useEffect(() => seedIfEmpty(), []);
  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/leads" />} />
          <Route path="/leads" element={<Dashboard />} />
          <Route path="/lead/:id" element={<LeadDetail />} />

          {/* Empty pages so sidebar items open */}
          <Route path="/wv-leads" element={<Blank title="WellVantage Leads" />} />
          <Route path="/members" element={<Blank title="Member Management" />} />
          <Route path="/membership" element={<Blank title="Membership Management" />} />
          <Route path="/attendance" element={<Blank title="Attendance Tracking" />} />
          <Route path="/employees" element={<Blank title="Employee Management" />} />
          <Route path="/revenue" element={<Blank title="Revenue Management" />} />
          <Route path="/expenses" element={<Blank title="Expense Management & Profit" />} />
          <Route path="/workout" element={<Blank title="Workout Management" />} />
          <Route path="/logout" element={<LoggedOut />} />

          {/* Fallback */}
          <Route path="*" element={<Blank title="Not Found" />} />
        </Routes>
      </div>
    </div>
  );
}
