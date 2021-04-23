export const sortByDate = (arr) => {
  return arr.slice().sort((a, b) => b.date - a.date);
  // sort() it also sorts the original array.
  // we use slice() to create a copy of the array
};
