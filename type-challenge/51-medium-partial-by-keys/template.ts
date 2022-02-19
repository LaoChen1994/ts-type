type RealKey<K> = K extends K ? K : never;

type RealObj<T extends object, K extends keyof T = keyof T> = {
  [key in RealKey<K>]: T[K];
};

type PartialByKeys<
  T extends object,
  K extends string = "",
  R extends keyof T = keyof T,
  V extends object = {
    [key in Exclude<RealKey<R>, K>]: T[key];
  } & {
    [key in K extends RealKey<keyof T> ? K : never]?: T[key];
  }
> = K extends ""
  ? {
      [key in keyof V]?: V[key];
    }
  : {
      [key in keyof V]: V[key];
    };
