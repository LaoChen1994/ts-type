type IComputedValues<C> = {
  [K in keyof C]: C[K] extends (...args: any[]) => infer P ? P : never;
};

declare function SimpleVue<D, C, M>(options: {
  data: (this: {}) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<D & M & IComputedValues<C>>
}): any;
