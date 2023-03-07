import Page from '../components/page';
import getPageTemplate from '../utils/getPageTemplate';
import api from '../components/api';

export default new Page({
  makeElement() {
    return getPageTemplate('login-page');
  },
  setEventListeners(router) {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const login = document.getElementById('login-input').value;
      const password = document.getElementById('password-input').value;

      api
        .postLogin({ login, password })
        .then((res) => {
          if (res.ok) {
            router.loadPage('accounts');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
});
