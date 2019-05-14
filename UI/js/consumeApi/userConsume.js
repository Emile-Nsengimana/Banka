/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const err = document.querySelector('.error');
let msg;
class userManager {
  // ******************************** SIGN IN
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
          msg = result.error || result.message;
          message(msg);
        }
    }

    // ********************************  SIGN UP
    static async signup() {
        const user = {
          firstName: document.querySelector('#txt-firstname').value,
          lastName: document.querySelector('#txt-lastname').value,
          gender: document.querySelector('#txt-gender').value,
          phoneNo: document.querySelector('#txt-phone').value,
          email: document.querySelector('#txt-email').value,
          password: document.querySelector('#txt-password-2').value,
          confirmPassword: document.querySelector('#txt-confirm-password').value,
        };
      const res = await consume('/api/v2/auth/signup/', 'POST', user);
      const result = await res.json();
      if (res.ok) {
        sessionStorage.setItem('X-user-token', result.data.token);
        localStorage.setItem('X-user-token', result.data.token);
        localStorage.setItem('X-user-email', result.data.email);
        msg = result.error || result.message || ' ';
        err.classList.add('success');
        message(msg + 'you can now sign in');  
      } else {
        err.classList.remove('success');
        msg = result.error || result.message;
        message(msg);
      }
    }
  }
  
  const message = (msg) =>{
    err.style.display = 'block';
    err.classList.add('warning');
    err.classList.toggle('error-toggle');
    err.innerText = msg;
  }
  document.querySelector('#btn-signin').addEventListener('click', userManager.signin);
  document.querySelector('#btn-register').addEventListener('click', userManager.signup);
