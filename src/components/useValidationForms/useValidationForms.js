import React, { useCallback } from "react";
import validator from 'validator';

//хук управления формой и валидации формы
export function useValidationForms(props) {
  const [values, setValues] = React.useState(props);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});

    const validEmail = name === 'email' ? validator.isEmail(value) : true; 

    setErrors({...errors, [name]: event.target.validationMessage})
    if (name === 'email' && !validEmail && value.includes('@')) {
      setErrors({...errors, [name]: 'введите домен верхнего уровня после знака @'});
    }
    setIsValid(event.target.closest("form").checkValidity())
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}