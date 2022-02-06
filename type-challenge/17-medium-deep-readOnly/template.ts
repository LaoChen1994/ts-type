type Primitive = string | number | boolean;

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Primitive | Function
    ? T[K]
    : DeepReadonly<T[K]>;
};

type DeepReadonly2<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};

type b = DeepReadonly<X>;
