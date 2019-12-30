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
    let numberOfOccurrences = {};

    for (let num of numbers) {
        numberOfOccurrences[num] = numberOfOccurrences[num] ? numberOfOccurrences[num] + 1 : 1;
    }

    return numberOfOccurrences;
}

countNumbers('erer384jj4444666888jfd123');
countNumbers('jdjjka000466588kkkfs662555');