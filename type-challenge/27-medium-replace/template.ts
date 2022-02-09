type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer T}${From}${infer Z}`
  ? `${T}${To}${Z}`
  : S;
