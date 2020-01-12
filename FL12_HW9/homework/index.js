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
    func(parseInt(item))));

  return transformedArray;
}

console.log(`1: convert(1, '2', 3, '4') should return ["1", 2, "3", 4]`, convert(1, '2', 3, '4'));

console.log(`2: executeForEach([1, 2, 3], function(el) {console.log(el * 2)}) should log 2 4 6)`);
executeForEach([1, 2, 3], function(el) {console.log(el * 2)});

console.log(`3: mapArray([2, '5', 8], function(el) {return el + 3}) should return [5, 8, 11]`);
console.log(mapArray([2, '5', 8], function(el) {return el + 3;}));