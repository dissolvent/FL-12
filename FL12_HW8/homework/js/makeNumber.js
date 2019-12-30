function makeNumber(inputString) {
    let output = '';

    for (let char of inputString) {
        if (!isNaN(char)) {
            output += char;
        }
    }
    
    return output;
}