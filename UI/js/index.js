/* eslint-disable no-undef */
// ========================================== SIGN UP ====================================
const btnSignUp = document.getElementById('btn-signup');
btnSignUp.addEventListener('click', () => {
  document.querySelector('.info').style.width = '55%';
  document.querySelector('.content').style.width = '38.5%';
  document.getElementById('signin').style.display = 'none';
  document.getElementById('signup').style.display = 'block';
});

// ========================================== PASSWORD RESET ====================================
const btnResetPassword = document.getElementById('btn-reset-password');
const btnClose = document.getElementById('close');
function showModal() {
  document.getElementById('all').style.opacity = 0.3;
  document.getElementById('modal-reset').style.display = 'block';
}

function hideModal() {
  document.getElementById('all').style.opacity = 1;
  document.getElementById('modal-reset').style.display = 'none';
}
btnResetPassword.addEventListener('click', showModal);
btnClose.addEventListener('click', hideModal);
