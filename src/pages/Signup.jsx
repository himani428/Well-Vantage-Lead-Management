import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AuthBrand from "../components/AuthBrand";

// Error mapping helper
const mapSignupError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Email/Password sign-up is disabled in Firebase.";
    default:
      return "Sign up failed. Please try again.";
  }
};

export default function Signup() {
  const { signupWithEmail, loginWithGoogle } = useAuth();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      const displayName = [fname.trim(), lname.trim()].filter(Boolean).join(" ");
      await signupWithEmail({ email, password, displayName });
      navigate("/leads", { replace: true });
    } catch (err) {
      console.error("Signup error:", err);
      alert(mapSignupError(err?.code));
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    try {
      setBusy(true);
      await loginWithGoogle();
      navigate("/leads", { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Google sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onApple = () => {
    alert("Sign in with Apple is not configured yet. (UI shown as requested)");
  };

  return (
    <>
      <AuthBrand />
      <div className="wv-auth-shell">
        <div className="wv-card">
          <h1 className="wv-title">Sign up for WellVantage</h1>

          <form onSubmit={onSignup}>
            <div className="wv-row">
              <div className="wv-col">
                <label className="wv-label" htmlFor="fname">First Name</label>
                <input
                  id="fname"
                  className="wv-input"
                  value={fname}
                  onChange={e=>setFname(e.target.value)}
                  required
                />
              </div>
              <div className="wv-col">
                <label className="wv-label" htmlFor="lname">Last Name</label>
                <input
                  id="lname"
                  className="wv-input"
                  value={lname}
                  onChange={e=>setLname(e.target.value)}
                />
              </div>
            </div>

            <label className="wv-label" htmlFor="semail">Email</label>
            <input
              id="semail"
              type="email"
              className="wv-input"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />

            <label className="wv-label" htmlFor="spass">Password</label>
            <input
              id="spass"
              type="password"
              className="wv-input"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />

            <button className="wv-btn primary" type="submit" disabled={busy}>
              {busy ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="wv-or"><span>or</span></div>

          {/* Google Button */}
          <button className="wv-btn oauth gbtn" onClick={onGoogle} disabled={busy}>
            <svg className="oauth-ic" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083h-1.611V20H24v8h11.303c-1.65 4.66-6.08 8-11.303 8-6.627 0-12-5.373-12-12S17.373 12 24 12c3.06 0 5.84 1.153 7.96 3.04l5.657-5.657C34.559 6.05 29.639 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.34-.138-2.646-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.307 14.691l6.571 4.819C14.4 16.106 18.863 12 24 12c3.06 0 5.84 1.153 7.96 3.04l5.657-5.657C34.559 6.05 29.639 4 24 4c-7.98 0-14.79 4.66-17.693 10.691z"/>
              <path fill="#4CAF50" d="M24 44c5.176 0 9.86-1.977 13.403-5.197l-6.195-5.238C29.16 35.878 26.71 37 24 37c-5.202 0-9.618-3.318-11.287-7.95l-6.49 5.004C9.076 39.346 16.008 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.79 2.23-2.286 4.118-4.09 5.482l6.195 5.238C40.56 35.822 44 30.59 44 24c0-1.34-.138-2.646-.389-3.917z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Apple Button (UI only) */}
          <button className="wv-btn oauth applebtn" type="button" onClick={onApple}>
            <svg className="oauth-ic" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M16.365 1.43c0 1.14-.48 2.253-1.3 3.121-.83.88-2.18 1.55-3.52 1.406-.15-1.074.43-2.247 1.26-3.128.83-.88 2.31-1.552 3.56-1.399zM20.74 17.03c-.64 1.49-1.41 2.96-2.54 4.6-1.16 1.63-2.58 3.64-4.49 3.67-1.66.03-2.2-1.07-4.11-1.07-1.9 0-2.5 1.05-4.14 1.1-1.66.06-2.92-1.76-4.08-3.38C.69 19.61-.38 16.32.29 13.77c.56-2.07 2.24-3.39 4.17-3.42 1.63-.03 3.17 1.12 4.11 1.12.94 0 2.83-1.37 4.78-1.17.81.03 3.09.33 4.56 2.52-.12.07-2.72 1.6-2.17 4.28.31 1.58 1.29 2.52 2.98 3.0z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>

          <div className="wv-bottom">
            Already have an account?{" "}
            <Link to="/login" className="wv-link">Log in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
