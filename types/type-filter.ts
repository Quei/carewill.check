type TypeKeyFilter<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

export type TypeFilter<T, U> = {
  [Q in TypeKeyFilter<Required<T>, U>]: T[Q];
};
