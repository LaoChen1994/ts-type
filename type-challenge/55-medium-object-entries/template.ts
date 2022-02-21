type ObjectEntries<
  T extends object,
  R extends T = {
    [K in keyof T]-?: T[K];
  },
  K extends keyof R = keyof R
> = K extends K ? [K, R[K]] : [];
