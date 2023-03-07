import './styles';

import appRouter from './factories/routerFactory';

if (localStorage.getItem('Authorization')) {
  appRouter.loadPage('accounts');
} else {
  appRouter.loadPage('login');
}
