type SplitType = " " | "." | ",";

type CapitalizeWords<
  S extends string,
  R extends string = "",
  F extends boolean = true
> = S extends `${infer P}${infer T}`
  ? F extends true
    ? P extends keyof CapMap
      ? CapitalizeWords<T, `${R}${CapMap[P]}`, false>
      : CapitalizeWords<T, `${R}${P}`, F>
    : P extends SplitType
    ? CapitalizeWords<T, `${R}${P}`, true>
    : CapitalizeWords<T, `${R}${P}`, F>
  : R;
