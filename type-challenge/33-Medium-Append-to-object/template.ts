type AppendToObject<
  T extends object,
  U extends string,
  V,
  R extends T = T & { [key in U]: V }
> = {
  [K in keyof R]: R[K];
};
