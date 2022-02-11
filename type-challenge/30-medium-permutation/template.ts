type Permutation<T extends any, U = T> = (() => T) extends () => never
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];

// type B = "A" | "B" | "C";

// type CC<B, T> = B extends T ? true : false;

// type DD = CC<B, string>;

// type EE<T, U = T> = T extends U ? [T, Exclude<U, T>] : never;

// type B = "A" | "B" | "C";

// type EE<T, U = T> = T extends U ? [T, Exclude<U, T>] : never

// type ee = EE<B>;
