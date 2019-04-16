/* eslint-disable no-undef */
// ========================== DEBIT ========================
const btnDebit = document.getElementById('btn-debit');
btnDebit.addEventListener('click', () => {
  document.getElementById('display').style.display = 'none';
  document.getElementById('credit').style.display = 'none';
  document.getElementById('debit').style.display = 'block';
  document.getElementById('profile-admin').style.display = 'none';

  document.getElementById('btn-debit').classList.add('active');
  document.getElementById('btn-bank-acct').classList.remove('active');
  document.getElementById('btn-credit').classList.remove('active');
  document.getElementById('btn-profile').classList.remove('active');

});
// ========================== CREDIT ========================
const btnCredit = document.getElementById('btn-credit');
btnCredit.addEventListener('click', () => {
  document.getElementById('display').style.display = 'none';
  document.getElementById('debit').style.display = 'none';
  document.getElementById('credit').style.display = 'block';
  document.getElementById('profile-admin').style.display = 'none';

  document.getElementById('btn-debit').classList.remove('active');
  document.getElementById('btn-bank-acct').classList.remove('active');
  document.getElementById('btn-credit').classList.add('active');
  document.getElementById('btn-profile').classList.remove('active');

});
// ========================================== ACCOUNTS ========================
const btnAccs = document.getElementById('btn-bank-acct');
btnAccs.addEventListener('click', () => {
  document.getElementById('display').style.display = 'block';
  document.getElementById('debit').style.display = 'none';
  document.getElementById('credit').style.display = 'none';
  document.getElementById('profile-admin').style.display = 'none';

  document.getElementById('btn-debit').classList.remove('active');
  document.getElementById('btn-bank-acct').classList.add('active');
  document.getElementById('btn-credit').classList.remove('active');
  document.getElementById('btn-profile').classList.remove('active');

});
// ========================================== STAFF LOGOUT ===================
const btnEmployeeLogout = document.getElementById('btn-cashier-logout');
btnEmployeeLogout.addEventListener('click', () => {
  location.href = 'index.html';
});

// ===================================== PROFILE ===========================================
const btnProfile = document.getElementById('btn-profile');

btnProfile.addEventListener('click', () => {
    document.getElementById('display').style.display = 'none';
    document.getElementById('debit').style.display = 'none';
    document.getElementById('credit').style.display = 'none';
    document.getElementById('profile-admin').style.display = 'block';

    document.getElementById('btn-bank-acct').classList.remove('active');
    document.getElementById('btn-debit').classList.remove('active');
    document.getElementById('btn-credit').classList.remove('active');
    document.getElementById('btn-profile').classList.add('active');

  });

// ================================================= PASSWORD RESET =========================
const btnChangePassword = document.getElementById('btn-change-password');
const modalChangePassword = document.getElementById('change-password');
const btnCancelPawwordReset = document.getElementById('btn-cancel-reset');

btnChangePassword.addEventListener('click', () => {
  document.getElementById('profile-info').style.display = 'none';
  modalChangePassword.style.display = 'block';
});
btnCancelPawwordReset.addEventListener('click', () => {
  document.getElementById('profile-info').style.display = 'block';
  modalChangePassword.style.display = 'none';
});