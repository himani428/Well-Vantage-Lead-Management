// src/components/AuthBrand.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AuthBrand() {
  return (
    <div className="wv-brandbar">
      <Link to="/login" className="wv-brandlink" aria-label="WellVantage">
        {/* Reuse your app's logo-mark from Sidebar styling */}
        <div className="logo-mark"><i /></div>
        <div className="brand-name">WellVantage</div>
      </Link>
    </div>
  );
}
