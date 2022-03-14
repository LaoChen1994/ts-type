type RequiredKeys<
  T extends object,
  C extends T = {
    [K in keyof T]-?: T[K];
  },
  K extends keyof T = keyof T,
  R extends object = {
    [key in K extends K ? (T[K] extends C[K] ? K : never) : never]: T[K];
  }
> = keyof R;
