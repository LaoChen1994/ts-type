type a = {
    a: 1,
    b: 2
}

// K extends K 可以只获取有参数名的key，那些泛型的key就过滤掉了
type CC<T extends object, K extends keyof T = keyof T> = K extends K ? K : never;

type cc = CC<a>

type PickByType<T extends object, U, K extends keyof T = keyof T> = {
  [key in K extends K ? (T[K] extends U ? K : never) : never]: U;
};
