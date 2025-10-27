// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listenAuth,
  loginWithGooglePopupOrRedirect,
  logoutFirebase,
  resolveRedirectResultOnce,
  signupEmailPassword,
  loginEmailPassword,
  resetPassword,
} from "../firebase";

const AuthCtx = createContext({ user: null, ready: false });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    resolveRedirectResultOnce(); // surface redirect results if any
    const unsub = listenAuth((u) => {
      setUser(u || null);
      setReady(true);
    });
    return unsub;
  }, []);

  const loginWithGoogle = () => loginWithGooglePopupOrRedirect();
  const signupWithEmail = (p) => signupEmailPassword(p);
  const loginWithEmail = (p) => loginEmailPassword(p);
  const requestPasswordReset = (email) => resetPassword(email);
  const logout = () => logoutFirebase();

  return (
    <AuthCtx.Provider
      value={{
        user, ready,
        loginWithGoogle,
        signupWithEmail,
        loginWithEmail,
        requestPasswordReset,
        logout
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
export function useAuth() { return useContext(AuthCtx); }
