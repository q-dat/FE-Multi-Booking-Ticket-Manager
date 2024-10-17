import React, { forwardRef } from 'react';
import { Input } from 'react-daisyui';

interface InputModalProps {
  placeholder: string;
  type: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  readOnly?: boolean;
}

const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  (
    { placeholder, type, value, name, onChange, defaultValue, readOnly },
    ref
  ) => {
    return (
      <div className="mb-4 border-b">
        <Input
          ref={ref}
          value={value}
          type={type}
          name={name}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className="w-full rounded-md border-none bg-white p-0 text-sm font-light text-black focus:outline-none dark:bg-gray-800 dark:text-white md:w-64"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default InputModal;
