import './styles';

import Router from './components/router';

import login from './pages/loginPage';
import history from './pages/historyPage';
import exchange from './pages/exchangePage';
import map from './pages/mapPage';
import account from './pages/singleAccountPage';
import accounts from './pages/allAccountsPage';

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

router.loadPage('accounts');

router
  .setClickOnElementWithClassToLeadTo({
    className: 'map-link',
    pageName: 'map',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'exit-link',
    pageName: 'login',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'accounts-link',
    pageName: 'accounts',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'currencies-link',
    pageName: 'exchange',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'logo',
    pageName: 'accounts',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'account-open-link',
    pageName: 'account',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'account-open-link',
    pageName: 'account',
  })
  .setClickOnElementWithClassToLeadTo({
    className: 'history',
    pageName: 'history',
  });

router.setEventListeners();
