type Join<
  T extends string[],
  U extends number | string,
  C extends any[] = [number],
  S extends string = T[0]
> = T extends []
  ? ""
  : T["length"] extends C["length"]
  ? S
  : Join<T, U, [...C, number], `${S}${U}${T[C["length"]]}`>;
