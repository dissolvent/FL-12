'use strict';

let a, b, c, discriminant;

a = prompt('Enter "a" value');
b = prompt('Enter "b" value');
c = prompt('Enter "c" value');

if (isNaN(a) || isNaN(b) || isNaN(c) || !a || !b || !c || +a === 0) {
    console.log('Invalid input data');
} else {
    discriminant = Math.pow(b, 2) - 4 * a * c;
    
    if (discriminant > 0) {
        let x1 = Number( ( (-b + Math.sqrt(discriminant)) / (2 * a) ).toFixed(2));
        let x2 = Number( ( (-b - Math.sqrt(discriminant)) / (2 * a) ).toFixed(2));
        console.log(`x1 = ${x1} and x2 = ${x2}`);
    } else if (discriminant === 0) {
        let x = Math.round(-b / (2 * a));
        console.log(`x = ${x}`);
    } else {
        console.log('no solution');
    }
}