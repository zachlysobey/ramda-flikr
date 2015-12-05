import _ from 'ramda';

var test = [1, 2, 3];

var log = it => console.log(it);

// test.forEach(log);
_.map(log, test);

console.log('testing');
