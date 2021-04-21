export default function doSort(collection, order, target){
  return collection.sort((a, b) => order === 'ascending' ? a[target] - b[target] : b[target] - a[target]);
}