const {add, mul} = require('./a');
const _ = require('lodash');

const sum = add(10, 20);
const arr = _.concat([1, 2], 3);

console.log(sum);
console.log(arr);
