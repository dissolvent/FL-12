function addOne(x) {
  return x + 1;
}

function pipe(value, ...args) {
  for (let func of args) {
    value = func(value);
  }
  return value;
}