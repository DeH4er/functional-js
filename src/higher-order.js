export const compose =
    f => g => x => f (g (x));


export const uncurry =
    f => a => b => f (a, b);


export const curry =
    f => (a, b) => f (a) (b);


export const flip =
    f => a => b => f (b) (a);


export const apply =
    f => x => f (x)


export const id =
    a => a;


export const callback =
    x => () => x
