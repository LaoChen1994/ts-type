type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

// type A<X> = <T>() => T extends X ? 1 : 2;
// type a = A<{ a: "A" }>;
// type b = A<false>;

// type c = A<boolean> extends A<false> ? true : false;
// type e = a extends b ? true : false;
