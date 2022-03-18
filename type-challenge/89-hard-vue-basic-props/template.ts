type Computed<T> = {
  [K in keyof T]: T[K] extends infer P
    ? P extends (...args: any) => infer R
      ? R
      : never
    : never;
};

type TypeCheck<T, K = any> = T extends () => infer A
  ? A
  : T extends (a: any) => infer C
  ? C
  : K;

type A2U<T extends any[], R = null> = T extends [infer P, ...infer C]
  ? R extends null
    ? A2U<C, TypeCheck<P>>
    : A2U<C, TypeCheck<P> | R>
  : R;

type Props<T> = {
  [K in keyof T]: T[K] extends { type: infer A }
    ? A extends () => infer C
      ? C
      : A extends new (...args: any) => any
      ? InstanceType<A>
      : A extends Array<infer B>
      ? TypeCheck<B>
      : RegExp
    : TypeCheck<T[K]>;
};

declare function VueBasicProps<P, D, C, M>(options: {
  props: P;
  data: (this: Props<P>) => D;
  computed: C & ThisType<D & Props<P>>;
  methods: M & ThisType<D & Computed<C> & M & Props<P>>;
}): any;
