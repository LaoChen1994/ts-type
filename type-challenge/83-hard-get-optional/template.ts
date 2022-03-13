type GetOptional<
  T extends object,
  R extends T = NoRequired<T>,
  K extends keyof T = keyof T
> = {
  [key in K extends K ? (T[K] extends R[K] ? never : K) : never]?: R[key];
};
