const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const SUBSTITUTE_THRESHOLD = 30;

function convert(...args) {
  let convertedArgs = [];

  for (let i of args) {
    convertedArgs.push(typeof i === 'string' ? Number(i) : String(i))
  }

  return convertedArgs;
}

function executeForEach(arr, func) {
  for (let i of arr) {
    func(i);
  }

  return;
}

function mapArray(arr, func) {
  let transformedArray = [];
  executeForEach(arr, item => transformedArray.push(
    func(parseInt(item)) ));
  return transformedArray;
}

function filterArray(arr, func) {
  let filteredArray = []

  executeForEach(arr, function(item) {
    if (func(item)) {
      filteredArray.push(item);
    }
  });

  return filteredArray;
}

function flipOver(str) {
  let reversed = '';

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}

function makeListFromRange([start, stop]) {
  let range = [];

  for (start; start <= stop; start++) {
    range.push(start);
  }

  return range;
}

function getArrayOfKeys(arr, key) {
  let keysArray = [];
  executeForEach(arr, item => keysArray.push(item[key]));
  return keysArray;
}

function substitute(arr) {
  return mapArray(arr, item => item < SUBSTITUTE_THRESHOLD ? '*' : item);
}

function getPastDay(date, daysAgo) {
  return new Date(date - daysAgo * MILLISECONDS_IN_DAY).getDate();
}

function formatDate(date) {
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${date.getMinutes()}`
}
