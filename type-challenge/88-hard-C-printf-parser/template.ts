type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

type ParsePrintFormat<
  S extends string,
  R extends string[] = []
> = S extends `${infer P}%${infer D}${infer T}`
  ? D extends keyof ControlsMap
    ? ParsePrintFormat<T, [...R, ControlsMap[D]]>
    : D extends "%"
    ? ParsePrintFormat<T, R>
    : R
  : R;
