type isMatch<T, U> = (() => T) extends (() => U) ? true : false;

type FilterOut<T extends any[], F, R extends any[] = []> = T extends [
  infer U,
  ...infer V
]
  ? isMatch<U, F> extends true
    ? FilterOut<V, F, R>
    : FilterOut<V, F, [...R, U]>
  : R;

type CCC = FilterOut<['a', never], never>