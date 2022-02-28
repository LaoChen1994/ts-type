type MyExclude2<T, R> = R extends T ? "" : R

type AllCombinations<S extends string> = S extends ""
  ? ""
  : S extends `${infer P}${infer T}`
  ?
      | P
      | AllCombinations<T>
      | `${AllCombinations<T>}${P}`
      | `${P}${AllCombinations<T>}`
  : "";
