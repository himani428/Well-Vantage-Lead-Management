// src/pages/LoggedOut.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div className="empty-wrapper">
      <div className="empty-box">
        <div className="empty-icon" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15H11v-2h2Zm0-4H11V7h2Z"/>
          </svg>
        </div>
        <h2 className="empty-title">You’ve been logged out</h2>
        <p className="empty-desc">
          This is a frontend-only demo. Your session has ended.
        </p>

        {/* Primary action back to Leads */}
        <Link
          to="/leads"
          className="primary"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: 12,
            textDecoration: "none",
            marginTop: 12,
          }}
        >
          Return to Lead Management
        </Link>
      </div>
    </div>
  );
}
