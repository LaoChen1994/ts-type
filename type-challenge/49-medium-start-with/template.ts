type StartsWith<T extends string, U extends string> = T extends `${U}${infer P}`
  ? true
  : false;
