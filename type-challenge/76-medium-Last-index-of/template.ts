type LastIndexOf<T extends any[], U> = T extends [...infer A, infer B]
  ? B extends U
    ? A["length"]
    : LastIndexOf<A, U>
  : -1;
