// src/pages/LoggedOut.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoggedOut() {
  const { logout } = useAuth();

  useEffect(() => {
    logout().catch(console.error);
  }, [logout]);

  return (
    <div className="empty-wrapper">
      <div className="empty-box">
        <div className="empty-icon" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15H11v-2h2Zm0-4H11V7h2Z"/>
          </svg>
        </div>
        <h2 className="empty-title">You’ve been logged out</h2>
        <p className="empty-desc">Thanks for visiting. Sign back in anytime.</p>
        <Link
          to="/login"
          className="primary"
          style={{ display: "inline-block", padding: "12px 22px", borderRadius: 12, textDecoration: "none", marginTop: 12 }}
        >
          Sign in again
        </Link>
      </div>
    </div>
  );
}
