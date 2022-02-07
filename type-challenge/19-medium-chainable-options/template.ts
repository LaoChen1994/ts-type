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

declare const a: Chainable;

const result = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

type bb = typeof result;
