type CurryFn<fn, R extends any = null> = fn extends (
  ...args: infer P
) => infer C
  ? P extends [...infer A, infer B]
    ? R extends null
      ? CurryFn<(...args: A) => R, (args: B) => C>
      : CurryFn<(...args: A) => R, (args: B) => R>
    : R
  : R;

declare function Currying<R, C>(fn: C): CurryFn<C>
