import {
  fromArray,
  foldr,
  fromString,
  toString,
  map,
  repeat,
  insert,
  concat
} from './list';

import {
  plus,
  mul
} from './number';

import {
  compose,
  id,
  callback,
} from './higher-order';

import {
  toUpper
} from './string';


// composition of functions
const fns = fromArray ([plus (1), mul (2)]);
const mul2plus1 = foldr (compose) (id) (fns);
console.log (mul2plus1 (1));  // 3


// map list of chars
const helloList = fromString ('hello');
const xxxxList = map (callback ('x')) (helloList);
console.log (toString (xxxxList));  //  xxxxxx


// map list of chars with composition inside
const anotherHelloList = fromString ('hello');
const angryList = map (compose (toUpper) (callback ('x'))) (anotherHelloList);
console.log (toString (angryList));  // XXXXX


// prettify hello
const listOfStarFunctions = repeat (5) (insert ('*'));
const stars = foldr (compose) (callback (null)) (listOfStarFunctions);
const lists = fromArray ([stars (), fromString ('hello'), stars ()])
const prettyHello = foldr (concat) (null) (lists);
console.log (toString (prettyHello));  // ******hello******
