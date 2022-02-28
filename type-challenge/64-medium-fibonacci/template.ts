type ArraysLength<T, K> = T extends any[]
  ? K extends any[]
    ? [...T, ...K]["length"]
    : T["length"]
  : K extends any[]
  ? K["length"]
  : 0;

type Fibonacci<
  T extends number,
  C extends number[] = [number],
  V extends any[][] = [[number], [number]]
> = C["length"] extends T
  ? V extends [infer X, infer Y]
    ? X extends any[]
      ? X["length"]
      : 0
    : 0
  : V extends [infer X, infer Y]
  ? X extends any[]
    ? Y extends any[]
      ? Fibonacci<T, [...C, number], [Y, [...X, ...Y]]>
      : 0
    : 0
  : 0;
