type Diff<
  O,
  O1,
  K1 extends keyof O = keyof O,
  K2 extends keyof O1 = keyof O1,
  R = {
    [K in Exclude<K1, K2>]: O[K];
  } & {
    [K in Exclude<K2, K1>]: O1[K];
  }
> = {
  [K in keyof R]: R[K];
};
