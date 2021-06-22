export function nonNullableFilter<T>(value: T): value is NonNullable<T> {
  return value !== null;
}
