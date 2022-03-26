
type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [K in keyof T as T[K] extends string
    ? Capitalize<T[K]>
    : never]: K extends string ? (N extends false ? T[K] : ToNumber<K>) : never;
}