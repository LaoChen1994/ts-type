type StringToUnion<
  T extends string,
  R extends object = {}
> = T extends `${infer P}${infer K}`
  ? P extends ""
    ? keyof R
    : StringToUnion<K, R & { [key in P]: 1 }>
  : keyof R;
