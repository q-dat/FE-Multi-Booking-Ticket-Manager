import React, { forwardRef } from 'react';
import { Input } from 'react-daisyui';

interface InputModalProps {
  placeholder: string;
  type: string;
  value?: string | number;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  ({ placeholder, type, value, name, onChange }, ref) => {
    return (
      <div className="mb-4 border-b">
        <Input
          ref={ref}
          value={value}
          type={type}
          name={name}
          className="w-full rounded-md border-none p-0 text-sm font-light focus:outline-none md:w-64"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default InputModal;