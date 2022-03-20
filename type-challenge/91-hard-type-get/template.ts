type Get<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer U}`
  ? P extends keyof T
    ? Get<T[P], U>
    : never
  : never;
