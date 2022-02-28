type TransKeyToString<T> = T extends boolean | string | number ? `${T}` : "";

type Flip<
  T extends object,
  K extends keyof T = keyof T,
  V extends T[K] = T[K]
> = {
  [key in TransKeyToString<V>]: K extends K
    ? TransKeyToString<T[K]> extends key
      ? K
      : never
    : never;
};
