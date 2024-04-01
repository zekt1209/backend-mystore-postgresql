// array like object
var obj = { 0: "a",
            1: "b",
            2: "c" };

console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
console.log(Object.values(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
console.log(Object.keys(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
console.log(Object.getOwnPropertyNames(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

Object.entries(obj).forEach((entrie, index) => {

});

const date = new Date();
console.log(date);

let formatter = new Intl.DateTimeFormat('es-MX', {timeZone: 'America/Mexico_City'});

const mxDate = date.toLocaleString('es-MX', {timeZone: 'America/Mexico_City'})
console.log(mxDate.replace(',', ''));
