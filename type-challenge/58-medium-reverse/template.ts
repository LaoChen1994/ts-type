type Reverse<T extends any[]> = T extends [infer P, ...infer K]
  ? [...Reverse<K>, P]
  : [];
