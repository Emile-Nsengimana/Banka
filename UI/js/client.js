/* eslint-disable no-undef */
const btnCreateAcct = document.getElementById('btn-create-account');
const btnSaveAcct = document.getElementById('btn-add-acct');
const btnCloseCreateAcct = document.getElementById('close');
const btnTransactionHistory = document.getElementById('btn-transaction-history');

btnCreateAcct.addEventListener('click', () => {
  document.getElementById('modal-account').style.display = 'block';
  document.getElementById('all').style.opacity = 0.3;
});
let i = 2;
btnSaveAcct.addEventListener('click', () => {
  i += 1;
  document.getElementById('acctInfo').innerHTML += `
    <h3>Account ${i}</h3>
                <div class="form-group">
                    <label for="">Account type:</label>
                    <input class="inp2" type="text" value=${document.getElementById('slct-acct-type').value}>
                </div>
                <div class="form-group">
                <label for="">Account No.:</label>
                <input class="inp2" type="text" value="123-456-878-345">
        </div>
        <div  class="form-group">
            <label for="">Account balance:</label>
            <input class="inp2" type="text" value="1 000 000">
        </div>
    `;
});
btnCloseCreateAcct.addEventListener('click', () => {
  document.getElementById('modal-account').style.display = 'none';
  document.getElementById('all').style.opacity = 1;
});
// ========================================== CLIENT LOG-OUT =======================================
const btnClientLogout = document.getElementById('btn-client-logout');
btnClientLogout.addEventListener('click', () => {
  location.href = 'index.html';
});

// ========================================== TRANSFER ============================================
const btnTransfer = document.getElementById('btn-menu-transfer');
const btnMyAccount = document.getElementById('btn-menu-myaccount');
btnTransfer.addEventListener('click', () => {
  document.getElementById('acctInfo').style.display = 'none';
  document.getElementById('btn-create-account').style.display = 'none';
  document.getElementById('transfer').style.display = 'block';
  document.getElementById('transaction-history').style.display = 'none';

  if (btnTransfer.className === 'btn-default') {
    btnMyAccount.classList.remove('active');
    btnTransfer.classList.add('active');
    btnTransactionHistory.classList.remove('active');
  }
});
btnMyAccount.addEventListener('click', () => {
  document.getElementById('acctInfo').style.display = 'block';
  document.getElementById('btn-create-account').style.display = 'block';
  document.getElementById('transfer').style.display = 'none';
  document.getElementById('transaction-history').style.display = 'none';

  if (btnMyAccount.className === 'btn-default') {
    btnMyAccount.classList.add('active');
    btnTransfer.classList.remove('active');
    btnTransactionHistory.classList.remove('active');
  }
});
// ========================================== TRANSACTION HISTORY ==========================
btnTransactionHistory.addEventListener('click', () => {
  document.getElementById('acctInfo').style.display = 'none';
  document.getElementById('transfer').style.display = 'none';
  document.getElementById('btn-create-account').style.display = 'none';
  document.getElementById('transaction-history').style.display = 'block';
  if (btnTransactionHistory.className === 'btn-default') {
    btnMyAccount.classList.remove('active');
    btnTransfer.classList.remove('active');
    btnTransactionHistory.classList.add('active');
  }
});
