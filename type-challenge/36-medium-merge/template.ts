type MergeObj<F extends object, S extends object> = {
  [K in keyof S]: S[K];
} & {
  [K in Exclude<keyof F, keyof S>]: F[K];
};

type Merge<
  F extends object,
  S extends object,
  R extends object = MergeObj<F, S>
> = {
  [K in keyof R]: R[K];
};
