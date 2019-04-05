// ========================================== SIGN UP ====================================
const btnSignUp = document.getElementById('btn-signup');
btnSignUp.addEventListener('click', () => {
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});
// ========================================== STAFF SIGN IN ====================================
const btnStaffLogin = document.getElementById('btn-staff-login');
btnStaffLogin.addEventListener('click', () => {
    document.getElementById('signin').style.display = 'none';
    document.getElementById('staff').style.display = 'block';
});
// ========================================== PASSWORD RESET ====================================
const btnResetPassword = document.getElementById('btn-reset-password');
const btnClose = document.getElementById('close');

btnResetPassword.addEventListener('click', showModal);
btnClose.addEventListener('click', hideModal);

function showModal() {
    document.getElementById('all').style.opacity = 0.3;
    document.getElementById('modal-reset').style.display = 'block';
}

function hideModal() {
    document.getElementById('all').style.opacity = 1;
    document.getElementById('modal-reset').style.display = 'none';
}
// ========================================== STAFF PASSWORD RESET ====================================
const btnResetStaff = document.getElementById('btn-reset-staff');
btnResetStaff.addEventListener('click', showModal);

// ========================================== CLIENT LOGIN ============================================
const btnClientLogin = document.getElementById('btn-client-login');
btnClientLogin.addEventListener('click', () => {
    location.href = 'client.html';
});
// ========================================== STAFF LOGIN ============================================
const btnEmployeeLogin = document.getElementById('btn-staff-in');
const username = document.getElementById('txt-username');

btnEmployeeLogin.addEventListener('click', () => {
    if(username.value === 'cashier'){
        location.href = 'cashier.html';
    }else{
        location.href = 'admin.html';
    }
});
