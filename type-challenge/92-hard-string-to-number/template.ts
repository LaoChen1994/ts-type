type ToNumber<
  S extends string,
  R extends string[] = []
> = `${R["length"]}` extends S ? R["length"] : ToNumber<S, [...R, string]>;
