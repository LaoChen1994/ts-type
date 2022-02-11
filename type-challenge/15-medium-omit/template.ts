type MyEx<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof T> = {
  [key in MyEx<keyof T, K>]: T[key];
};