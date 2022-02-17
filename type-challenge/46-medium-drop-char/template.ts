type DropChar<
  S,
  C extends string,
  R extends string = ""
> = S extends `${infer P}${infer K}`
  ? C extends ""
    ? `${R}${DropChar<S, " ", R>}`
    : P extends C
    ? `${R}${DropChar<K, C, R>}`
    : `${R}${P}${DropChar<K, C, "">}`
  : R;
