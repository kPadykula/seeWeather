export const filterUndefinedParams = <T>(
  input: Partial<T>,
  omitKeys?: string[],
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key in input) {
    if (input[key] !== undefined && !omitKeys?.includes(key)) {
      result[key as keyof T] = input[key] as T[keyof T];
    }
  }

  return result;
};
