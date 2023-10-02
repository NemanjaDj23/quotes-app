import React, { useCallback, useState } from 'react';

type UseFormOutput<T> = {
  values: T;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  setFieldValue: (valueObject: Partial<T>) => void;
};

export function useForm<T>(initialValue: T): UseFormOutput<T> {
  const [values, setValues] = useState(initialValue);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  const setFieldValue = useCallback(
    (valueObject: Partial<T>) => {
      setValues((prevState) => ({
        ...prevState,
        ...valueObject,
      }));
    },
    [setValues],
  );

  return { values, handleChange, setFieldValue };
}
