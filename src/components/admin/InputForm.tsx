import React from 'react';
import { Input } from 'react-daisyui';

const InputForm: React.FC<{ placeholder: string; type: string }> = ({
  placeholder,
  type
}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="w-full text-black focus:outline-none"
    />
  );
};

export default InputForm;
