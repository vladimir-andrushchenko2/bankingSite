import Page from '../components/page';
import getPageTemplate from '../utils/getPageTemplate';

export default new Page({
  makeElement() {
    return getPageTemplate('history-page');
  },
  setEventListeners() {},
});
