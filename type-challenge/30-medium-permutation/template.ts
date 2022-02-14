type Permutation<T extends any, U = T> = (() => T) extends () => never
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];