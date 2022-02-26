type TupleToNestedObject<T extends string[], U> = T["length"] extends 0
  ? U
  : T extends [...infer R, infer P]
  ? R extends string[]
    ? P extends string
      ? TupleToNestedObject<R, { [key in P]: U }>
      : never
    : never
  : never;
