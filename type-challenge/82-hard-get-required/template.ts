type NoRequired<T extends object> = {
  [key in keyof T]-?: T[key];
};

type GetRequired<
  T extends object,
  R extends T = NoRequired<T>,
  K extends keyof T = keyof T
> = {
  [key in K extends K ? (T[K] extends R[K] ? K : never) : never]: T[key];
};
