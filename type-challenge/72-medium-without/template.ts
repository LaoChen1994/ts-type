type FormatArray<T> = T extends any[] ? T : [T];

type Without<
  T extends any[],
  U,
  R extends any[] = [],
  K extends any[] = FormatArray<U>
> = T extends [infer P, ...infer C]
  ? Includes<K, P> extends true
    ? Without<C, U, R>
    : Without<C, U, [...R, P]>
  : R;
