export default function getTemplate(idOfTemplate, selectorOfClonedNode) {
  return document
    .getElementById(idOfTemplate)
    .content.querySelector(selectorOfClonedNode)
    .cloneNode(true);
}
