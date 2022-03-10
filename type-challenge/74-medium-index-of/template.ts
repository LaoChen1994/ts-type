type IndexOf<
  T extends any[],
  U,
  C extends any[] = []
> = C["length"] extends T["length"]
  ? -1
  : T[C["length"]] extends U
  ? C["length"]
  : IndexOf<T, U, [...C, number]>;
