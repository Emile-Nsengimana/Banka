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
    console.log(btnChange.className);
    if(btnChange.className === 'btn btn-warn'){
        document.getElementById('txt-status').value = 'Dormant'
        btnChange.innerHTML = 'Activate';
        btnChange.classList.add('btn-success');
    }else{
        document.getElementById('txt-status').value = 'Active';
        btnChange.innerHTML = 'Deactivate';
        btnChange.classList.remove('btn-success');
    }
    
});
// ---------------------------------- CLOSE MODAL -------------------------------------------------
const btnClose = document.getElementById('close-search');
btnClose.addEventListener('click', hideModal);
function hideModal() {
    document.getElementById('modal-search').style.display = 'none';
}

// ---------------------------------- SEARCH -------------------------------------------------
function view(){
    viewBankAccount.style.display = 'block';
}
btnSearch.addEventListener('click', view);
// ================================= USER ACCOUNT ==============================
function accounts(){
    viewUserAccount.style.display = 'block';
}
const hideUserAccount = document.getElementById('close-account');
hideUserAccount.addEventListener('click', hideAccounts);
function hideAccounts() {
    document.getElementById('modal-view-account').style.display = 'none';
}
document.getElementById('btn-search-user').addEventListener('click', accounts);