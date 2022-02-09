type TrimLeft<T extends string> = T extends `${infer P}${infer K}`
  ? P extends " " | "\n" | "\t"
    ? TrimLeft<K>
    : T
  : never;
