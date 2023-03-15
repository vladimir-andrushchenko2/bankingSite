export default function handleHistory(option, route) {
  if (option === 'none') {
    return;
  }

  if (option === 'push') {
    window.history.pushState(null, null, `#${route}`);
    return;
  }

  if (option === 'replace') {
    window.history.replaceState(null, null, `#${route}`);
    return;
  }

  throw new Error('no matching history option');
}
