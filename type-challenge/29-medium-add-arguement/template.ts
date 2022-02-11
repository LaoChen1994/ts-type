type ARGS<T extends any> = T extends (...args: infer P) => any ? P : never;
type MyReturn<T extends any> = T extends (...args: any[]) => infer P
  ? P
  : never;

type AppendArgument<Fn, A> = (
  ...args: [...ARGS<Fn>, ...[x: A]]
) => MyReturn<Fn>;
