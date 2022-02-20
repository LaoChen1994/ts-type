type MyRequired<T extends object> = {
  [K in keyof T]-?: T[K];
};

type RequiredByKeys<
  T extends object,
  K extends any = never,
  R extends object = isNever<K> extends true
    ? MyRequired<T>
    : {
        [key in Exclude<keyof T, K>]?: MyRequired<T>[key];
      } & {
        [key in Extract<K, keyof T>]: MyRequired<T>[key];
      }
> = {
  [key in keyof R]: R[key];
};
