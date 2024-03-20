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
