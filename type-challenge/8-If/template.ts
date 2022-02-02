type If<C, T, F> = C extends true ? (C extends null ? F : T) : F;
