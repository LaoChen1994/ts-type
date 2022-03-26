type buildArray<
  T extends string,
  R extends any[] = []
> = T extends `${infer A}%${infer B}${infer C}`
  ? B extends "d"
    ? buildArray<C, [...R, number]>
    : B extends "s"
    ? buildArray<C, [...R, string]>
    : R
  : R;

type GenFn<P extends any[], R extends any = string> = P extends [
  ...infer A,
  infer B
]
  ? GenFn<A, (args: B) => R>
  : R;

type Format<
  T extends string,
  P extends any[] = buildArray<T>,
> = GenFn<P>;
