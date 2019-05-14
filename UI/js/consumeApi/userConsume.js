/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
class userManager {
    static async signin() {
      const email = document.querySelector('#txt-user').value;
      const password = document.querySelector('#txt-password').value;
      const user = {
        email,
        password,
      };
      const res = await consume('/api/v2/auth/signin/', 'POST', user);
      const result = await res.json();
      if (res.ok) {
        sessionStorage.setItem('X-user-token', result.data.token);
        localStorage.setItem('X-user-token', result.data.token);
        localStorage.setItem('X-user-email', result.data.email);
        location.href = 'client.html';
      } else {
        const err = document.querySelector('.error');
        err.style.display = 'block';
        err.classList.add('warning');
        err.innerText = result.error || result.message;
      }
    }
  }
  
  document.querySelector('#btn-signin').addEventListener('click', userManager.signin);
  