type EmptyType = " " | "\t" | "\n";

type TL<S extends string> = S extends `${infer P}${infer K}`
  ? P extends " " | "\t" | "\n"
    ? TL<K>
    : S
  : never;

// trimRight不能和TL写的一样
// 因为这里的 P 和 Ｋ其实是贪婪的抓取，不会想象成从末尾开始取
// 所以这里要明确extends是不是末尾有EmptyType
type TR<S extends string> = S extends `${infer P}${EmptyType}` ? TR<P> : S;

type Trim<S extends string> = TR<TL<S>>;
