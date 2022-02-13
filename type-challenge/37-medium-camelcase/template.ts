type isNever<T> = (() => T) extends () => never ? true : false;
type Letter = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type CamelCase<
  S extends string,
  F extends any = never,
  R extends string = ""
> = S extends `${infer T}${infer P}`
  ? isNever<F> extends false
    ? T extends Letter[keyof Letter]
      ? CamelCase<`${P}`, never, `${R}-${T}`>
      : T extends keyof Letter
      ? CamelCase<`${P}`, never, `${R}${Letter[T]}`>
      : CamelCase<P, F, `${R}${T}`>
    : T extends keyof Letter
    ? CamelCase<P, never, `${R}${T}`>
    : T extends "-"
    ? P extends ""
      ? `${R}-`
      : CamelCase<P, false, `${R}`>
    : CamelCase<P, F, `${R}${T}`>
  : R;
