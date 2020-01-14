const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

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
  return mapArray(arr, item => item < 30 ? '*' : item);
}

function getPastDay(date, daysAgo) {
  return new Date(date - daysAgo * MILLISECONDS_IN_DAY).getDate();
}

function formatDate(date) {
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${date.getMinutes()}`
}

console.log(`1: convert(1, '2', 3, '4') should return ["1", 2, "3", 4]`, convert(1, '2', 3, '4'));

console.log(`2: executeForEach([1, 2, 3], function(el) {console.log(el * 2)}) should log 2 4 6)`);
executeForEach([1, 2, 3], function(el) {console.log(el * 2)});

console.log(`3: mapArray([2, '5', 8], function(el) {return el + 3}) should return [5, 8, 11]`);
console.log(mapArray([2, '5', 8], function(el) {return el + 3}));

console.log(`4: filterArray([2, 5, 8], function(el) { return el % 2 === 0 }) should return returns [2, 8]`);
console.log(filterArray([2, 5, 8], function(el) { return el % 2 === 0 }));

console.log(`5: flipOver('hey world') should return 'dlrow yeh'`);
console.log(flipOver('hey world'));

console.log(`6: makeListFromRange([2, 7]) should return [2, 3, 4, 5, 6, 7]`);
console.log(makeListFromRange([2, 7]));

const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
console.log(`7: getArrayOfKeys(actors, ‘name’); should return [‘tommy’, ‘lee’]`);
console.log(getArrayOfKeys(actors, 'name'));

console.log(`8: substitute([58, 14, 48, 2, 31, 29]); should return [58, '*', 48, '*', 31, '*']`);
console.log(substitute([58, 14, 48, 2, 31, 29]));

const date = new Date(2019, 0, 2);
console.log(`9: getPastDay(date, 1); // 1`, getPastDay(date, 1));
console.log(`9: getPastDay(date, 2); // 31`, getPastDay(date, 2));
console.log(`9: getPastDay(date, 365); // 2`, getPastDay(date, 365));
