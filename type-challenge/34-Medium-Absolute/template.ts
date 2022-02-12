type Absolute<T extends string | number | bigint> = (
  T extends any ? `${T}` : never
) extends `-${infer P}`
  ? P
  : `${T}`;
