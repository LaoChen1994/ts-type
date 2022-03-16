type SplitLetter = "_";

type QueryValue<
  T extends object,
  V extends any,
  K extends keyof T = keyof T
> = K extends K ? T[K] extends V ? K : never : never

type CamelCaseHard<
  S extends string,
  R extends string = "",
  F extends boolean = false
> = S extends `${infer P}${infer T}`
  ? P extends SplitLetter
    ? CamelCaseHard<T, R, true>
    : F extends true
    ? P extends keyof CapMap
      ? CamelCaseHard<T, `${R}${CapMap[P]}`, false>
      : CamelCaseHard<T, `${R}${P}`, false>
    : P extends CapMap[keyof CapMap]
    ? CamelCaseHard<T, `${R}${QueryValue<CapMap, P>}`, F>
    : CamelCaseHard<T, `${R}${P}`, F>
  : R;
