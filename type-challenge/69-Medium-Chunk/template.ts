type Chunk<
  T extends readonly any[],
  N extends number,
  R extends any[] = [],
  C extends any[] = []
> = T extends [infer A, ...infer B]
  ? C["length"] extends N
    ? Chunk<B, N, [...R, C], [A]>
    : Chunk<B, N, R, [...C, A]>
  : C extends []
  ? R
  : [...R, C];
