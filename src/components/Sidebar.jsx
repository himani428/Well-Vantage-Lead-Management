import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// 🖤 Black SVG icons using currentColor
const I = {
  lead: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM6 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm10 2c-3.87 0-7 1.79-7 4v2h14v-2c0-2.21-3.13-4-7-4ZM6 14c-2.67 0-5 1.34-5 3v3h6v-3c0-1.03.51-1.98 1.36-2.77A9.1 9.1 0 0 0 6 14Z"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
    </svg>
  ),
  member: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 5v3h16v-3c0-3-4-5-8-5Z"/>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4h18V6H3v2Zm0 4h10v2H3v-2Z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h5v-2h-4V6h-2v7Z"/>
    </svg>
  ),
  brief: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M10 4h4a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v3H2V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2Zm-8 9h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M3 3h2v18H3zM7 13h2v8H7zM11 8h2v13h-2zM15 5h2v16h-2zM19 10h2v11h-2z"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M2 6h20v12H2zM6 10h4v4H6zM4 8h2v2H4zm14 6h2v2h-2zm0-6h2v2h-2z"/>
    </svg>
  ),
  dumbbell: (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M1 10h4v4H1zM5 9h2v6H5zM7 11h10v2H7zM17 9h2v6h-2zM19 10h4v4h-4z"/>
    </svg>
  )
};

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } finally {
      navigate("/logout");
    }
  };

  const Item = ({ to, icon, children }) => (
    <NavLink to={to} className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}>
      <span className="ni">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );

  return (
    <aside className="sidebar">
      <div className="sb-top">
        <div className="logo-mark"><i /></div>
        <div className="logo-name">WellVantage</div>
      </div>

      <div className="nav">
        <div className="nav-group-title">MANAGEMENT</div>
        <Item to="/leads" icon={I.lead}>Lead Management</Item>
        <Item to="/wv-leads" icon={I.check}>WellVantage Leads</Item>
        <Item to="/members" icon={I.member}>Member Management</Item>
        <Item to="/membership" icon={I.card}>Membership Management</Item>
        <Item to="/attendance" icon={I.clock}>Attendance Tracking</Item>
        <Item to="/employees" icon={I.brief}>Employee Management</Item>
        <Item to="/revenue" icon={I.chart}>Revenue Management</Item>
        <Item to="/expenses" icon={I.money}>Expense Management & Profit</Item>
        <Item to="/workout" icon={I.dumbbell}>Workout Management</Item>
      </div>

      <div className="sidebar-footer">
        <div className="me">
          <div className="avatar">DS</div>
          <div>David Smith</div>
        </div>
        <a
          href="/logout"
          onClick={handleLogout}
          className="logout"
          style={{ textDecoration: "none", display: "block", textAlign: "center" }}
        >
          ▢ Logout
        </a>
      </div>
    </aside>
  );
}
