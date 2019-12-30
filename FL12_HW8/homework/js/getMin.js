function getMin(...args) {
    let min = args[0];

    for (let num of args) {
        min = num < min ? num : min;
    }
    
    return min;
}

getMin(3, 0, -1);
getMin(3, -1, 0);
getMin(-1, 0, 3);
