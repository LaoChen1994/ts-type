type FlipArguments<T> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : never;
