export default function getPageTemplate(idOfTemplate) {
  return document
    .getElementById(idOfTemplate)
    .content.querySelector('.main')
    .cloneNode(true);
}
