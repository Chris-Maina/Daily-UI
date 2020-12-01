import React from 'react';
import clsx from 'clsx';
import classes from './Input.module.scss';

interface IInput {
  name: string,
  value: string,
  type?: string,
  required?: boolean,
  placeholder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  className,
  type='text',
  required=false,
}: IInput) => {
  return (
    <input 
      type={type}
      name={name} 
      value={value} 
      required={required} 
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(classes.Input, className)} 
    />
  )
}

export default Input;
