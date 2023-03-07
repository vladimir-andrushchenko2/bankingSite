export default function createEmptyObjectsArray(numObjects) {
  const arr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numObjects; i++) {
    arr.push({});
  }
  return arr;
}
