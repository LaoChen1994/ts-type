// type TupleToUnion<T extends any[]> = T[number]
type TupleToUnion<T extends any[]> = T extends (infer P)[] ? P : never;
