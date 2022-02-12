type Flatten<P extends any[], R extends any[] = []> = P extends [
  infer First,
  ...infer P
]
  ? First extends any[]
    ? [...R, ...Flatten<First>, ...Flatten<P>]
    : [...R, First, ...Flatten<P>]
  : [];
