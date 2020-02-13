export const or =
  a => b = a || b;


export const and =
  a => b => a && b;


export const not =
  a => !a;


export const eq =
  a => b => a === b;
