import React, { useCallback, useState } from 'react';

type UseFormOutput<T> = {
  values: T;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
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

  return { values, handleChange };
}
