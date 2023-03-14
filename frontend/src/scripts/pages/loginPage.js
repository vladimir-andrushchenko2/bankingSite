import getPageTemplate from '../utils/getPageTemplate';
import api from '../components/api';

export default function loginPage(router) {
  const page = getPageTemplate('login-page');

  const form = page.querySelector('.login-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;
    const errorDisplay = form.querySelector('.error-display');

    api
      .postLogin({ login, password })
      .then((res) => {
        if (res.ok) {
          router.loadPage('accounts');
          document.querySelector('.nav').classList.add('nav_opened');
        }
      })
      .catch((err) => {
        errorDisplay.textContent = err;
      });
  });

  return page;
}
