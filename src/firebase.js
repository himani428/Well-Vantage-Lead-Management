// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

// ⬇️ PASTE YOUR REAL CONFIG from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCp7tgeqKowhOTPcapCSGUxUyAY8Dmq6ZY",
  authDomain: "wellvantage-d946f.firebaseapp.com",
  projectId: "wellvantage-d946f",
  storageBucket: "wellvantage-d946f.firebasestorage.app",
  messagingSenderId: "697783173869",
  appId: "1:697783173869:web:41b1cf9af24252b7a902e4",
  measurementId: "G-FCZDS3F21C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google popup → redirect fallback
export async function loginWithGooglePopupOrRedirect() {
  try {
    return await signInWithPopup(auth, provider);
  } catch (err) {
    const popupIssues = new Set([
      "auth/popup-blocked",
      "auth/popup-closed-by-user",
      "auth/cancelled-popup-request",
      "auth/operation-not-supported-in-this-environment",
      "auth/unauthorized-domain",
    ]);
    if (popupIssues.has(err.code)) {
      await signInWithRedirect(auth, provider);
      return;
    }
    throw err;
  }
}
export async function resolveRedirectResultOnce() {
  try { return await getRedirectResult(auth); }
  catch { return null; }
}

export function listenAuth(cb) { return onAuthStateChanged(auth, cb); }
export function logoutFirebase() { return signOut(auth); }

// Email / password
export async function signupEmailPassword({ email, password, displayName }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  return cred.user;
}
export async function loginEmailPassword({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}
export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
