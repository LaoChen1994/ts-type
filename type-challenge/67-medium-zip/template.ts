type Zip<
  T extends any[],
  U extends any[],
  R extends any[] = []
> = T["length"] extends 0
  ? R
  : T extends [infer A, ...infer B]
  ? U extends [infer C, ...infer D]
    ? Zip<B, D, [...R, [A, C]]>
    : R
  : R;
