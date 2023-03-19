export type TRecord<T> = {
  [key: string | number]: Omit<T, "children"> & { children: TRecord<T> };
};

export const arrayToRecord = <T extends { children?: T[] }>(
  array: T[],
  key: keyof T
): TRecord<T> => {
  return array.reduce((prev, curr) => {
    if (curr.children) {
      return {
        ...prev,
        [curr?.[key] as never]: {
          ...curr,
          children: arrayToRecord(curr.children, key),
        },
      };
    }
    return {
      ...prev,
      [curr?.[key] as never]: curr,
    };
  }, {});
};

export const flattenChildren = <T extends { children?: T[] }>(input: T[]) => {
  const result = [...input];
  input.forEach((item) => {
    if (item.children && Array.isArray(item.children)) {
      result.push(...flattenChildren(item.children));
    }
  });
  return result;
};

export const getBarThickness = (length: number) => {
  if (length < 30) return 20;
  if (length >= 30 && length < 60) return 15;
  if (length >= 60 && length < 90) return 10;
  if (length >= 90) return 5;
};

/**
 * Flat array of nested object with `children` prop
 * @param array Nested object array with `children` prop
 * @returns Flatted array
 */
export const flatten = <T extends { children?: T[]; parent?: T }>(
  array: T[] = [],
  parent?: T
): T[] =>
  array.reduce<T[]>((prev, curr) => {
    if (curr.children) {
      return [
        ...prev,
        { ...curr, parent },
        ...flatten(curr.children, { ...curr, parent }),
      ];
    }

    return [...prev, { ...curr, parent }];
  }, []);
