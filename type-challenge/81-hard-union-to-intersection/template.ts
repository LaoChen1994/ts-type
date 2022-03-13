type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer P) => any
  ? P
  : never;
