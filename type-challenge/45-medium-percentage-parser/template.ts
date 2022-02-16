type Notion = "+" | "-" | "%";

type PercentageParser<
  A extends string,
  R extends any[] = []
> = A extends `${infer P}${infer T}`
  ? P extends Notion
    ? Handler2<T, [...R, P]>
    : Handler2<A, [...R, ""]>
  : Handler2<A, [...R, ""]>;

type Handler2<T extends string, R extends any[] = []> = T extends `${infer X}%`
  ? [...R, X, "%"]
  : T extends string
  ? [...R, T, ""]
  : [...R, "", ""];
