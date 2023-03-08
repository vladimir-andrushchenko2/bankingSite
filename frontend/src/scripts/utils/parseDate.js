export const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

export default function parseDate(jsonDate) {
  const date = new Date(jsonDate);
  return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
