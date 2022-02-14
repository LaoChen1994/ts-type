type isEmptyObject<T> = T extends object
  ? keyof T extends never
    ? true
    : false
  : false;

type isTrue<T> = T extends []
  ? false
  : T extends []
  ? false
  : T extends 0
  ? false
  : T extends ""
  ? false
  : T extends false
  ? false
  : isEmptyObject<T> extends true
  ? false
  : true;

type AnyOf<T extends readonly any[], R extends boolean = false> = T extends [
  infer P,
  ...infer K
]
  ? isTrue<P> extends true
    ? true
    : AnyOf<K, R>
  : R;
