const btnSignUp = document.getElementById('btn-signup');

btnSignUp.addEventListener('click', () => {
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});