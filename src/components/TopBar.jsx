import React from "react";
import { formatDate } from "../utils/formatDate";

export default function TopBar({ lastInteraction, onAdd }) {
  const label = formatDate(lastInteraction || new Date());

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* 📱 Hamburger menu for mobile view */}
        <button
          className="menu-toggle"
          aria-label="Toggle Menu"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* 🧭 Title */}
        <h1 className="h-title">Lead Management</h1>

        {/* ➕ Right Section */}
        <div className="h-right">
          <div className="last-int">Last interaction : {label}</div>
          <button className="add-icon" title="Add" onClick={onAdd}>
            +
          </button>
        </div>
      </div>
    </header>
  );
}
