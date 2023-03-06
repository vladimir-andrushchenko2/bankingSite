/**
 * selects template and clones element with class .main
 * @param {String} idOfTemplate
 * @returns Element
 */
export default function getPageTemplate(idOfTemplate) {
  return document
    .getElementById(idOfTemplate)
    .content.querySelector('.main')
    .cloneNode(true);
}
