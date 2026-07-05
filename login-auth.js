import { logIn, googleSignIn, resetPassword, friendlyAuthError } from "./auth.js";

const form = document.getElementById('loginForm');
const messageBox = document.getElementById('formMessage');
const submitBtn = document.getElementById('loginSubmitBtn');
const googleBtn = document.getElementById('googleSignInBtn');
const forgotLink = document.getElementById('forgotPasswordLink');

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    try {
        await logIn(email, password);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
        showMessage(friendlyAuthError(err), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});

googleBtn.addEventListener('click', async () => {
    try {
        await googleSignIn();
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
        showMessage(friendlyAuthError(err), 'error');
    }
});

forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) {
        showMessage('Enter your email above first, then click "Forgot Password?"', 'error');
        return;
    }
    try {
        await resetPassword(email);
        showMessage('Password reset email sent. Check your inbox.', 'success');
    } catch (err) {
        showMessage(friendlyAuthError(err), 'error');
    }
});