type MyExclude<T, K> = T extends K ? never : T;

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [key in K]: T[key];
} & {
  [key2 in MyExclude<keyof T, K>]: T[key2];
};
