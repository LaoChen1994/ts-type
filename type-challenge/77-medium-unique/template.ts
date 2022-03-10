type MyIncludes<T extends any[], U> = T extends [infer P, ...infer K]
  ? P extends U
    ? true
    : MyIncludes<K, U>
  : false;

type Unique<T extends any[], R extends any[] = []> = T extends [
  infer P,
  ...infer A
]
  ? MyIncludes<R, P> extends false
    ? Unique<A, [...R, P]>
    : Unique<A, R>
  : R;
