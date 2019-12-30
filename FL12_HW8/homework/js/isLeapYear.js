function isLeapYear(date) {
    let year = (new Date(date)).getFullYear();
    if (isNaN(year)) {
        return 'Invalid date';
    }
    
    if ( ((year % 4 === 0) && (year % 400 !== 0)) || (year % 100 === 0) ) {
        return `${year} is a leap year`;
    } else {
        return `${year} is not a leap year`;
    }
}

isLeapYear('2020-01-01 00:00:00');
isLeapYear('2020-01-01 00:00:00777');
isLeapYear('2021-01-15 13:00:00'); 
isLeapYear('2200-01-15 13:00:00');
isLeapYear(1213131313135465656654564646542132132131);
isLeapYear(1213131313);