import React, { useState } from 'react';

import classes from './SignUp.module.scss';
import { Input, Button, HelperText } from '../../components';
import { validateEmail, validateRequired, validateMinLength } from '../../helpers/formValidators';

interface IFormData {
  [x: string]: any;
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}
interface IFormErrors {
  [key: string]: any
}

const SignUpForm = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formData, setFormData] = useState<IFormData>(initialState);
  const [errors, setErrors] = useState<IFormErrors>({});

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value
    }));
  }

  const validate = () => {
    const errors: IFormErrors = {};
    const fields = ['name', 'email', 'password', 'confirmPassword'];

    fields.forEach((field: string) => {
      let error = validateRequired(formData[field]);
      if (error) {
        errors[field] = error;
      }

      if (field === 'email') {
        error = validateEmail(formData[field]);
        if (error) {
          errors[field] = error;
        }
      }

      if (field === 'password') {
        error = validateMinLength(formData[field], 8);
        if (error) {
          errors[field] = error;
        }
      }
    })

    if (formData.password !== formData.confirmPassword) {
      errors['confirmPassword'] = 'Passwords do not match';
    }
    return errors;
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const errors = validate();
    if (Object.values(errors).length) {
      setErrors(errors);
    } else {
      setErrors({});
      setFormData(initialState);
    }

  }
  return (
    <form className={classes.Form} onSubmit={handleSubmit}>
      <div className={classes.Form_Control}>
        <Input placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} required />
        <HelperText error={!!errors.name}>{errors.name}</HelperText>
      </div>
      <div className={classes.Form_Control}>
        <Input placeholder="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <HelperText error={!!errors.email}>{errors.email}</HelperText>
      </div>
      <div className={classes.Form_Control}>
        <Input placeholder="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <HelperText error={!!errors.password}>{errors.password}</HelperText>
      </div>
      <div className={classes.Form_Control}>
        <Input placeholder="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
        <HelperText error={!!errors.confirmPassword}>{errors.confirmPassword}</HelperText>
      </div>
      <Button className={classes.Form_Button} type='submit'>Sign up</Button>
    </form>
  )
}

export default SignUpForm;
