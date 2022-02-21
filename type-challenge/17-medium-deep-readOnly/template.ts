type Primitive = string | number | boolean;

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Primitive | Function
    ? T[K]
    : DeepReadonly<T[K]>;
};

type DeepReadonly2<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly2<T[K]>;
};