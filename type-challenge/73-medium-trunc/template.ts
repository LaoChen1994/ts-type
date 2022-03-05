type N2S<T extends number | string> = `${T}`;

type Trunc<
  T extends number | string,
  RS extends string = N2S<T>,
  R extends string = ""
> = RS extends `${infer A}${infer B}${infer C}`
  ? B extends "."
    ? `${R}${A}`
    : Trunc<T, `${B}${C}`, `${R}${A}`>
  : `${R}${RS}`;
