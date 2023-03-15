import './styles';

import appRouter from './factories/routerFactory';

function invokeLoadPageFromUrl(historyOption) {
  const route = window.location.hash.slice(1);
  const pathItems = route.split('/').filter((item) => item !== '');

  if (route === '') {
    appRouter.loadPage('accounts', undefined, { historyOption });
    return;
  }

  let pathname;
  let id;

  if (pathItems.length > 1) {
    [pathname, id] = pathItems;
  } else {
    [pathname] = pathItems;
  }

  // startsWith without '/' bc it was removed during split('/') earlier
  if (pathname.startsWith('accounts')) {
    appRouter.loadPage('accounts', undefined, { historyOption });
  } else if (pathname.startsWith('account')) {
    appRouter.loadPage('account', id, { historyOption });
  } else if (pathname.startsWith('map')) {
    appRouter.loadPage('map', undefined, { historyOption });
  } else if (pathname.startsWith('exchange')) {
    appRouter.loadPage('exchange', undefined, { historyOption });
  } else if (pathname.startsWith('history')) {
    appRouter.loadPage('history', id, { historyOption });
  } else {
    throw new Error('404');
  }
}

if (localStorage.getItem('Authorization')) {
  invokeLoadPageFromUrl('replace');
  document.querySelector('.nav').classList.add('nav_opened');
} else {
  appRouter.loadPage('login', undefined, { historyOption: 'replace' });
}

window.addEventListener('popstate', () => {
  invokeLoadPageFromUrl('none');
});
