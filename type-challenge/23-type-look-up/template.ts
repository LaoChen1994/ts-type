type LookUp<U extends { type: any }, T> = U extends infer P
  ? P extends { type: any }
    ? T extends P["type"]
      ? P
      : never
    : never
  : never;
