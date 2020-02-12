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
