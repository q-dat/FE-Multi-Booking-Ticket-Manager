import React from 'react';
import { Input } from 'react-daisyui';

interface InputFormProps {
  name?: string;
  className?: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameLabel: string;
  min?: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      name,
      className = '',
      type = 'text',
      placeholder = '',
      value,
      onChange,
      classNameLabel,
      min = ''
    },
    ref
  ) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          name={name}
          className={`peer w-full focus:outline-none ${className}`}
          type={type}
          placeholder=" "
          value={value}
          onChange={onChange}
          min={min}
        />
        <label
          className={`pointer-events-none absolute -top-2 left-2 rounded-sm px-1 py-0 text-sm text-primary transition-all duration-500 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:rounded-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary dark:peer-placeholder-shown:text-white dark:peer-focus:text-white ${classNameLabel}`}
        >
          {placeholder}
        </label>
      </div>
    );
  }
);

export default InputForm;
