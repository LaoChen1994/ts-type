type Last<T extends any[]> = T extends [...any[], infer P] ? P : undefined;
