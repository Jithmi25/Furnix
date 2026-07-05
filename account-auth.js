import { logOut } from "./auth.js";

document.addEventListener('furnix-auth-changed', (e) => {
    const user = e.detail.user;
    document.getElementById('accountLoading').style.display = 'none';
    if (user) {
        document.getElementById('accountDetails').style.display = 'block';
        document.getElementById('accountLoggedOut').style.display = 'none';
        document.getElementById('accName').textContent = user.displayName || '—';
        document.getElementById('accEmail').textContent = user.email || '—';
    } else {
        document.getElementById('accountDetails').style.display = 'none';
        document.getElementById('accountLoggedOut').style.display = 'block';
    }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logOut();
    window.location.href = 'index.html';
});
