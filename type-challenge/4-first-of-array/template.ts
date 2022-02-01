type First<T extends any[]> = T extends [] ? never : T[0];

type IA = First<[1, 2, 3]>