function makeNumber(inputString) {
    let output = '';

    for (let char of inputString) {
        if (!isNaN(char)) {
            output += char;
        }
    }
    
    return output;
}

function countNumbers(inputString) {
    let numbers = makeNumber(inputString);
    let numCount = {};

    for (let num of numbers) {
        numCount[num] = numCount[num] ? numCount[num] + 1 : 1;
    }

    return numCount;
}