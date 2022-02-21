type OmitByType<T extends object, U, K extends keyof T = keyof T> = {
  [key in K extends K ? (T[K] extends U ? never : K) : never]: T[key];
};
