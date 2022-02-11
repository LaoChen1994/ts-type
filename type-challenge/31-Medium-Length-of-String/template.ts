type LengthOfString<
  S extends string,
  C extends any[] = []
> = S extends `${infer P}${infer T}`
  ? LengthOfString<T, [...C, P]>
  : GetLength<C>;

type GetLength<T extends readonly any[]> = T["length"];
