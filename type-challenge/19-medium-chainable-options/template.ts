type Chainable<T extends object = {}> = {
  option<M extends string, V extends any>(
    key: M,
    value: V
  ): V extends infer P
    ? Chainable<
        {
          [key in M]: P;
        } & T
      >
    : never;
  get(): T;
};

