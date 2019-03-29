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

