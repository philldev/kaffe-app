import { useState } from "react";

export function useArrayState<T>(defaultValue: T[] = []) {
  const [value, setValue] = useState(defaultValue);

  const updateItem = (
    predicate: (item: T) => boolean,
    newVal: (item: T) => T
  ) => {
    setValue((old) =>
      old.map((item) => (predicate(item) ? newVal(item) : item))
    );
  };

  const add = (item: T) => {
    setValue((old) => [...old, item]);
  };

  const remove = (index: number) => {
    setValue((old) => old.filter((_, i) => i !== index));
  };

  const isEmpty = () => value.length === 0;

  return {
    value,
    setValue,
    add,
    remove,
    isEmpty,
    updateItem,
  };
}
