import { throwError } from './err';
import { flip, curry } from './higher-order';
import { and, not } from './bool';


export const isEmpty =
  l => l === null;


export const empty = Symbol('empty');


export const head =
  l => isEmpty (l)
    ? throwError ('head: isEmpty list')
    : l.head;


export const tail =
  l => isEmpty (l)
    ? throwError ('tail: isEmpty list')
    : l.tail;


export const fromArray =
  ar => ar.reverse().reduce(curry (flip (insert)), empty);


export const toArray =
  l => _toArray (l) ([]);


export const fromString =
  str => fromArray(str.split(''));


export const toString =
  l => toArray(l).join('');


export const insert =
  v => l => ({head: v, tail: l});


export const map =
  f => l => isEmpty (l)
    ? empty
    : insert (f (head(l))) (map (f) (tail (l)));


export const foldl =
  f => b => l => isEmpty (l)
    ? b
    : foldl (f) (f (b) (head (l))) (tail (l));


export const foldr =
  f => b => l => isEmpty (l)
    ? b
    : f (head (l)) (foldr (f) (b) (tail (l)))


export const concat =
  l1 => l2 => foldr (insert) (l1) (l2);


export const zip =
  l1 => l2 => and (not (isEmpty (l1))) (not (isEmpty (l2)))
    ? (() => {
      const zippedHead = insert (head (l1)) (insert (head (l2)) (empty));
      const zippedTail = zip (tail (l1)) (tail (l2));
      return insert (zippedHead) (zippedTail);
    })()
    : empty;


export const filter =
  f => l => isEmpty (l)
    ? empty
    : f (head (l))
      ? insert (head (l)) (filter (f) (tail (l)))
      : filter (f) (tail (l));


export const reverse =
  l => foldl (flip (insert)) (empty) (l);


export const replicate =
  times => item => times <= 0
    ? empty
    : insert (item) (replicate (times - 1) (item));


const _toArray =
  l => ar => isEmpty (l)
    ? []
    : [head (l), ..._toArray (tail (l)) (ar)];

