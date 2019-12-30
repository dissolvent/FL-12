function makeNumber(inputString) {
    let output = '';

    for (let char of inputString) {
        if (!isNaN(char)) {
            output += char;
        }
    }
    
    return output;
}

makeNumber('erer384jjjfd123');
makeNumber('123098h76gfdd');
makeNumber('ijifjgdj');