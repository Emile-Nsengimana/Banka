// ================================= MODAL USERS ==============================
const btnUsers = document.getElementById('btn-users');
btnUsers.addEventListener('click', () => {
    document.getElementById('display').style.display = 'none';
    document.getElementById('modal-users').style.display = 'block';
    btnUsers.classList.add('active');
    btnBankAcct.classList.remove('active');
});

// ================================= BANK ACCOUNTS ==============================
const btnBankAcct = document.getElementById('btn-bank-acct');
btnBankAcct.addEventListener('click', () => {
    document.getElementById('modal-users').style.display = 'none';
    document.getElementById('display').style.display = 'block';
    btnBankAcct.classList.add('active');
    btnUsers.classList.remove('active');
});

// ================================= SIGN OUT ==============================
const btnLogout = document.getElementById('btn-admin-logout');
btnLogout.addEventListener('click', () => {
    location.href = 'index.html';
});
