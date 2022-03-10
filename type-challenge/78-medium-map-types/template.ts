interface IMapDTO {
  mapFrom: any;
  mapTo: any;
}

type MapTypes<T extends object, R extends IMapDTO> = {
  [K in keyof T]: T[K] extends R["mapFrom"]
    ? R extends { mapFrom: T[K] }
      ? R["mapTo"]
      : never
    : T[K];
};
