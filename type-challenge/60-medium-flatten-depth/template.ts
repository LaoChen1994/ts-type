type FlattenDepth<
  T extends any[],
  N = 1,
  R extends any[] = [],
  C extends any[] = []
> = T extends [infer P, ...infer K]
  ? C["length"] extends N
    ? [...R, ...T]
    : P extends any[]
    ? FlattenDepth<K, N, [...R, ...FlattenDepth<P, N, [], [...C, number]>], C>
    : FlattenDepth<K, N, [...R, P], C>
  : R;
