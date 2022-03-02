type GreaterThan<
  T extends number,
  U extends number,
  A extends any[] = []
> = T extends A["length"]
  ? false
  : U extends A["length"]
  ? true
  : GreaterThan<T, U, [...A, number]>;
