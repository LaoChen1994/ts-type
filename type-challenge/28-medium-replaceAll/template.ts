type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer T}${From}${infer K}`
  ? `${T}${To}${ReplaceAll<K, From, To>}`
  : S;
