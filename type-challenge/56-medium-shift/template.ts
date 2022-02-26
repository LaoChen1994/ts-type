type Shift<T extends any[]> = T extends [infer P, ...infer X] ? X : never
