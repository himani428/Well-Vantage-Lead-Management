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

// ✅ Load from .env (CRA exposes only REACT_APP_ vars)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
  try {
    return await getRedirectResult(auth);
  } catch {
    return null;
  }
}

export function listenAuth(cb) {
  return onAuthStateChanged(auth, cb);
}
export function logoutFirebase() {
  return signOut(auth);
}

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
