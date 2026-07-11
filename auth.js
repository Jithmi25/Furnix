// auth.js
import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();

export async function signUp(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }
  return cred.user;
}

export async function logIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function googleSignIn() {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function logOut() {
  return signOut(auth);
}

export function friendlyAuthError(error) {
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account already exists with that email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/too-many-requests": "Too many attempts. Please try again in a bit."
  };
  return map[error.code] || "Something went wrong. Please try again.";
}

function updateAccountUI(user) {
  const accountLinks = document.querySelectorAll(
    'a.icon[aria-label="Account"], a.icon[aria-label="My Account"]'
  );
  accountLinks.forEach(link => {
    if (user) {
      link.setAttribute('href', 'account.html');
      link.setAttribute('aria-label', 'My Account');
      link.title = user.displayName
        ? `Signed in as ${user.displayName}`
        : `Signed in as ${user.email}`;
    } else {
      link.setAttribute('href', 'login.html');
      link.setAttribute('aria-label', 'Account');
      link.title = 'Login';
    }
  });
}

onAuthStateChanged(auth, (user) => {
  updateAccountUI(user);
  window.furnixCurrentUser = user;
  document.dispatchEvent(new CustomEvent('furnix-auth-changed', { detail: { user } }));
});