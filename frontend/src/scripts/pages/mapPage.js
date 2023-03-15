/* eslint-disable no-undef */
import getPageTemplate from '../utils/getPageTemplate';
import handleHistory from '../utils/handleHistory';

import api from '../components/api';

function parseMapData(data) {
  return data.map(({ lat, lon }) => [lat, lon]);
}

export default function mapPage(
  router,
  accountId,
  { historyOption } = { historyOption: 'push' }
) {
  handleHistory(historyOption, '/map');

  const page = getPageTemplate('map-page');

  api.getBankLocations().then((data) => {
    const points = parseMapData(data);
    ymaps.ready(() => {
      // Создание карты.
      const myMap = new ymaps.Map('map', {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: points[0],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 4,
        controls: [],
      });

      // Создание геообъекта с типом точка (метка).
      const myPlacemarks = points.map((point) => new ymaps.Placemark(point));

      // Размещение геообъекта на карте.
      myPlacemarks.forEach((myPlacemark) => {
        myMap.geoObjects.add(myPlacemark);
      });
    });
  });

  return page;
}
