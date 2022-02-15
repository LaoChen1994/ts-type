type RemoveIndexSignature<T, R extends any[] = []> = keyof T extends infer P
  ? P extends string
    // ? 
    : never
  : never;

type Foo = {
  [key: string]: any;
  foo(): void;
};

type CCC = RemoveIndexSignature<Foo>;
