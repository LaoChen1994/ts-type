type Mutable<R extends object> = {
  -readonly [K in keyof Readonly<R>]: R[K];
};
