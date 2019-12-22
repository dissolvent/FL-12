'use strict';

let a, b, c, discriminant;


a = prompt('Enter "a" value');
b = prompt('Enter "b" value');
c = prompt('Enter "c" value');

for (let num of [a, b, c]) {
    if (num === null || num === '' || isNaN(num) || a === 0) {
        console.log('Invalid input data');
    } else {
        discriminant = Math.pow(b, 2) - 4 * a * c;
        
        if (discriminant > 0) {
            let x1 = Math.round( (-b + Math.sqrt(discriminant)) / (2 * a) );
            let x2 = Math.round( (-b - Math.sqrt(discriminant)) / (2 * a) );
            console.log(`x1 = ${x1} and x2 = ${x2}`);
        } else if (discriminant === 0) {
            let x = Math.round(-b / (2 * a));
            console.log(`x = ${x}`);
        } else {
            console.log('no solution');
        }
    }
}