type MyAwaited<T extends Promise<any>> = T extends Promise<infer K>
  ? K extends Promise<infer R>
    ? R
    : K
  : never;

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;

type a = MyAwaited<Z>;
