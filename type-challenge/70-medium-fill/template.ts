type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = T["length"],
  R extends any[] = [],
  Count extends any[] = []
> = Count["length"] extends T["length"]
  ? R
  : Count["length"] extends End
  ? R
  : Count["length"] extends Start
  ? Slice<T, Start, End, [...R, T[Start]], [...Count, number]>
  : R extends []
  ? Slice<T, Start, End, R, [...Count, number]>
  : Slice<T, Start, End, [...R, T[Count["length"]]], [...Count, number]>;

type FillArray<
  N,
  Start extends number,
  End extends number,
  MaxLength extends number,
  R extends any[] = [],
  Count extends any[] = []
> = Count["length"] extends MaxLength
  ? R
  : Count["length"] extends End
  ? R
  : Count["length"] extends Start
  ? FillArray<N, Start, End, MaxLength, [N], [...Count, number]>
  : R["length"] extends 0
  ? FillArray<N, Start, End, MaxLength, R, [...Count, number]>
  : FillArray<N, Start, End, MaxLength, [...R, N], [...Count, number]>;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  StartArray extends any[] = Slice<T, 0, Start>,
  EndArray extends any[] = Slice<T, End, T["length"]>,
  R extends any[] = FillArray<N, Start, End, T["length"]>
> = GreaterThan<Start, End> extends true
  ? T
  : T extends []
  ? []
  : [...StartArray, ...R, ...EndArray];
