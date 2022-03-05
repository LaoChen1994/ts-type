type IsTuple<T> = T extends []
  ? true
  : T extends readonly [infer P, ...infer R]
  ? true
  : false;