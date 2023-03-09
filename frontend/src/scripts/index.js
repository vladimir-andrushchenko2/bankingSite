import './styles';

import appRouter from './factories/routerFactory';

import api from './components/api';

if (localStorage.getItem('Authorization')) {
  appRouter.loadPage('accounts');
  document.querySelector('.nav').classList.add('nav_opened');
} else {
  appRouter.loadPage('login');
}

document.querySelector('.exit-link').addEventListener('click', (event) => {
  event.preventDefault();
  api.logout();

  document.querySelector('.nav').classList.remove('nav_opened');
});
