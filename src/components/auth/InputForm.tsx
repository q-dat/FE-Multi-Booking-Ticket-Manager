import React from 'react';
import { Input } from 'react-daisyui';

interface InputFormProps {
  Holder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  Holder,
  type,
  value,
  onChange
}) => {
  return (
    <Input type={type} placeholder={Holder} value={value} onChange={onChange} />
  );
};

export default InputForm;
