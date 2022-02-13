type KebabCase<
  S extends string,
  R extends string = ""
> = S extends `${infer D}${infer P}`
  ? D extends Letter[keyof Letter]
    ? KebabCase<
        P,
        R extends "" ? `${Uncapitalize<D>}` : `${R}-${Uncapitalize<D>}`
      >
    : KebabCase<P, `${R}${D}`>
  : R;
