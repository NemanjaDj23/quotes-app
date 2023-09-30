import React, { useCallback, useState } from 'react';

type UseFormOutput = {
  values: Record<string, any>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useForm(initialValue: Record<string, any>): UseFormOutput {
  const [values, setValues] = useState(initialValue);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return { values, handleChange };
}
