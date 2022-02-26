type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = E["length"] extends 0
  ? M["length"] extends 0
    ? B
    : M extends (infer P)[]
    ? P extends string
      ? `${B}--${P}`
      : B
    : B
  : E extends (infer P)[]
  ? P extends string
    ? M["length"] extends 0
      ? `${B}__${P}`
      : M extends (infer R)[]
      ? R extends string
        ? `${B}__${P}--${R}`
        : B
      : B
    : B
  : B;
