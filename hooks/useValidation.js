import { useState, useEffect } from 'react';
import validate from 'helpers/validations';

const useValidation = (initialState, fn) => {
  
  const [values, setValues] = useState(initialState, fn)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(async () => {
    if (Object.keys(errors).length > 0) setSubmit(false)
    if (Object.keys(errors).length === 0 && submit) {
      setSubmit(false)
      await fn();
    }
  },[errors])

  const handleChange = e => {
    return setValues({...values, [e.target.name]: e.target.value })
  }

  const handleBlur = e => {
    if (e.target.value.trim()==="" || submit) return;
    setErrors(validate({[e.target.name]: e.target.value}));
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmit(true)
    setErrors(validate(values));
  }
  
  return { values, errors, submit, setValues, handleChange, handleSubmit, handleBlur };
}
 
export default useValidation;