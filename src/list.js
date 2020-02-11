import { throwError } from './err';
import { flip, curry } from './higher-order';


export const empty =
  l => l === null;


export const head =
  l => empty (l)
    ? throwError ('head: empty list')
    : l.head;


export const tail =
  l => empty (l)
    ? throwError ('tail: empty list')
    : l.tail;


export const insert =
  v => l => ({head: v, tail: l});


export const map =
  f => l => empty (l)
    ? null
    : insert (f (head(l))) (map (f) (tail (l)));


export const fromArray =
  ar => ar.reverse().reduce(curry (flip (insert)), null);


export const toArray =
  l => _toArray (l) ([]);


export const fromString =
  str => fromArray(str.split(''));


export const toString =
  l => toArray(l).join('');


export const foldl =
  f => b => l => empty (l)
    ? b
    : foldl (f) (f (b) (head (l))) (tail (l));


export const foldr =
  f => b => l => empty (l)
    ? b
    : f (head (l)) (foldr (f) (b) (tail (l)))


export const concat =
  l1 => l2 => foldr (insert) (l1) (l2);


export const repeat =
  times => item => times <= 0
    ? null
    : insert (item) (repeat (times - 1) (item));


const _toArray =
  l => ar => empty (l)
    ? []
    : [head (l), ..._toArray (tail (l)) (ar)];
