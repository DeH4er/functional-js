import {
  fromArray,
  foldr,
  fromString,
  toString,
  map,
  repeat,
  insert,
  concat,
  zip,
  toArray,
  filter,
  reverse,
  empty
} from './list';

import {
  plus,
  mul,
  succ,
  pred
} from './number';

import {
  compose,
  id,
  callback,
} from './higher-order';

import {
  toUpper,
  ord,
  chr
} from './string';


import {
  eq
} from './bool';


// composition of functions
const fns = fromArray ([plus (1), mul (2)]);
const mul2plus1 = foldr (compose) (id) (fns);
console.log (mul2plus1 (1));  // 3


// map list of chars
const helloList = fromString ('hello');
const xxxxList = map (callback ('x')) (helloList);
console.log (toString (xxxxList));  //  xxxxx


// map list of chars with composition inside
const anotherHelloList = fromString ('hello');
const angryList = map (compose (toUpper) (callback ('x'))) (anotherHelloList);
console.log (toString (angryList));  // XXXXX


// prettify hello
const listOfStarFunctions = repeat (5) (insert ('*'));
const stars = foldr (compose) (callback (empty)) (listOfStarFunctions);
const lists = fromArray ([stars (), fromString ('hello'), stars ()])
const prettyHello = foldr (concat) (empty) (lists);
console.log (toString (prettyHello));  // *****hello*****


// caesar code
const encodeFns = fromArray ([chr, succ, ord]);
const decodeFns = fromArray ([chr, pred, ord]);

const encode = foldr (compose) (id) (encodeFns);
const decode = foldr (compose) (id) (decodeFns);

const msg = fromString ('Secret message!');
const encodedMsg = map (encode) (msg);
const decodedMsg = map (decode) (encodedMsg);

console.log (toString (encodedMsg));  // Tfdsfu!nfttbhf"
console.log (toString (decodedMsg));  // Secret message!


// zip lists
const l1 = fromArray ([1, 2, 3, 4, 5]);
const l2 = fromArray ([5, 4, 3, 2, 1, 0]);
const zipped = zip (l1) (l2);
console.log(toArray (map (toArray) (zipped)));  // [ [ 1, 5 ], [ 2, 4 ], [ 3, 3 ], [ 4, 2 ], [ 5, 1 ] ]

const sums = map (foldr (plus) (0)) (zipped);
console.log(toArray (sums));  // [ 6, 6, 6, 6, 6 ]


// filter lists
const fullList = fromString ('Contains "a"');
const filtered = filter (eq ('a')) (fullList);
console.log (toString (filtered));  // aa


// reverse list
const notReversed = fromString ('Not reversed string');
const reversed = reverse (notReversed);
console.log (toString (reversed));  // gnirts desrever toN
