type IsUnion<T> = Permutation<T>["length"] extends 1 ? false : true;
