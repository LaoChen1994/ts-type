type EmptyLetter = " " | "\n" | "\t";

type TrimRight<S extends string> = S extends `${infer P}${EmptyLetter}`
  ? TrimRight<P>
  : S;
