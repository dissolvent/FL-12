function getMin(...args) {
    let min = args[0];
    for (let num of args) {
        min = num < min ? num : min;
    };
    return min;
}