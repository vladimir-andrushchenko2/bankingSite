import Router from '../components/router';
import api from '../components/api';

import login from '../pages/loginPage';
import history from '../pages/historyPage';
import exchange from '../pages/exchangePage';
import map from '../pages/mapPage';
import account from '../pages/singleAccountPage';
import accounts from '../pages/allAccountsPage';

const router = new Router({
  root: document.getElementById('app'),
  pages: {
    login,
    history,
    exchange,
    map,
    account,
    accounts,
  },
});

function hasClass(element, className) {
  return element.classList.contains(className);
}

const settings = {
  historyOption: 'push',
};

document.addEventListener('click', (event) => {
  const { target } = event;

  if (target.tagName === 'A') {
    event.preventDefault();
  }

  if (hasClass(target, 'map-link')) {
    router.loadPage('map', undefined, settings);
  }

  if (hasClass(target, 'exit-link')) {
    router.loadPage('login', undefined, settings);
    api.logout();
    document.querySelector('.nav').classList.remove('nav_opened');
  }

  if (hasClass(target, 'accounts-link')) {
    router.loadPage('accounts', undefined, settings);
  }

  if (hasClass(target, 'currencies-link')) {
    router.loadPage('exchange', undefined, settings);
  }

  if (hasClass(target, 'logo')) {
    router.loadPage('accounts', undefined, settings);
  }
});

export default router;
