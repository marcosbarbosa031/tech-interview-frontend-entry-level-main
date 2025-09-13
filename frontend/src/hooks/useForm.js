import { useState, useCallback } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, []);

  const resetToDefault = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, handleChange, resetToDefault };
};

export default useForm;
