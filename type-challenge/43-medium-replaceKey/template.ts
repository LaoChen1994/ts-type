type ReplaceKeys<U extends object, T, Y extends object> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};
