import React from "react";
import { useLocation, Link } from "react-router-dom";

// Small inline icons that follow currentColor
const InfoIcon = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2Zm0-8h-2V7h2Z"/>
  </svg>
);
const CheckIcon = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
  </svg>
);
const LockIcon = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Zm-6 0V6a2 2 0 1 1 4 0v2Z"/>
  </svg>
);

// Build a friendly title/description per route so the same component works everywhere
function useEmptyCopy() {
  const { pathname } = useLocation();

  const map = {
    "/wv-leads": {
      title: "WellVantage Leads",
      desc: "This page is intentionally empty for now. New features will appear here soon.",
      icon: InfoIcon,
    },
    "/members": {
      title: "Member Management",
      desc: "Manage your members, plans, and renewals here. Coming soon.",
      icon: InfoIcon,
    },
    "/membership": {
      title: "Membership Management",
      desc: "Products, plans, promos, and benefits will live on this page.",
      icon: InfoIcon,
    },
    "/attendance": {
      title: "Attendance Tracking",
      desc: "Track check-ins and training sessions. This module is on the way.",
      icon: InfoIcon,
    },
    "/employees": {
      title: "Employee Management",
      desc: "Staff roles, schedules, and performance—coming soon.",
      icon: InfoIcon,
    },
    "/revenue": {
      title: "Revenue Management",
      desc: "Monitor collections, dues, and KPIs. Dashboard arriving soon.",
      icon: InfoIcon,
    },
    "/expenses": {
      title: "Expense Management & Profit",
      desc: "Log expenses and view profitability analytics here.",
      icon: InfoIcon,
    },
    "/workout": {
      title: "Workout Management",
      desc: "Plan and assign workouts for members. Feature under construction.",
      icon: InfoIcon,
    },
    "/logout": {
      title: "You’ve been logged out",
      desc: (
        <>
          You can <Link to="/leads" className="empty-link">sign back in</Link> anytime.
        </>
      ),
      icon: CheckIcon,
    },
  };

  // Default fallback
  return (
    map[pathname] || {
      title: "Coming soon",
      desc: "This section will be available shortly.",
      icon: InfoIcon,
    }
  );
}

export default function Blank() {
  const copy = useEmptyCopy();
  return (
    <div className="empty-wrapper">
      <div className="empty-box">
        <div className="empty-icon">{copy.icon}</div>
        <h2 className="empty-title">{copy.title}</h2>
        <p className="empty-desc">{copy.desc}</p>
      </div>
    </div>
  );
}
