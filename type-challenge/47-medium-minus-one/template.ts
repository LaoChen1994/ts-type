type NumberToTuple<
  T extends number,
  U extends any[] = []
> = U["length"] extends T ? U : NumberToTuple<T, [1, ...U]>;

type MinusOne<
  T extends number,
  R extends number[] = NumberToTuple<T>
> = R extends [infer P, ...infer X] ? X["length"] : 0;

