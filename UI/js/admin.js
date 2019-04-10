/* eslint-disable no-undef */
const viewBankAccount = document.getElementById('modal-search');
const btnSearch = document.getElementById('btn-search');
const viewUserAccount = document.getElementById('modal-view-account');

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
// ================================= ACTIVATE || DEACTIVATE CLIENT ==============================
const btnChange = document.getElementById('btn-status');
btnChange.addEventListener('click', () => {
  if (btnChange.className === 'btn btn-warn') {
    document.getElementById('txt-status').value = 'Dormant';
    document.getElementById('txt-status-2').value = 'Dormant';
    btnChange.innerHTML = 'Activate';
    btnChange.classList.add('btn-success');
  } else {
    document.getElementById('txt-status').value = 'Active';
    document.getElementById('txt-status-2').value = 'Dormant';

    btnChange.innerHTML = 'Deactivate';
    btnChange.classList.remove('btn-success');
  }
});
// ---------------------------------- CLOSE MODAL -------------------------------------------------
function hideModal() {
  document.getElementById('modal-search').style.display = 'none';
}
const btnClose = document.getElementById('close-search');
btnClose.addEventListener('click', hideModal);

// ---------------------------------- SEARCH -------------------------------------------------
function view() {
  viewBankAccount.style.display = 'block';
}
btnSearch.addEventListener('click', view);

// ================================= USER ACCOUNT ==============================
function accounts() {
  viewUserAccount.style.display = 'block';
}
const hideUserAccount = document.getElementById('close-account');
function hideAccounts() {
  document.getElementById('modal-view-account').style.display = 'none';
}
hideUserAccount.addEventListener('click', hideAccounts);

document.getElementById('btn-search-user').addEventListener('click', accounts);

// ---------------------------------- ADD USER -------------------------------------------------
const btnCancelAddUser = document.getElementById('close-add-user');
const btnAddUser = document.getElementById('btn-create-user');

const modalCreateUserAcct = document.getElementById('modal-add-user');
btnCancelAddUser.addEventListener('click', () => {
  modalCreateUserAcct.style.display = 'none';
});
btnAddUser.addEventListener('click', () => {
  modalCreateUserAcct.style.display = 'block';
});
