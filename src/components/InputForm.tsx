import React from "react";
import { Input } from "react-daisyui";

interface InputFormProps {
  className?: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  className = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="relative w-[150px]">
      <Input
        className={`peer border border-primary w-full focus:outline-none focus:border-primary ${className}`}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        className="absolute left-2 -top-2 bg-white px-1 text-primary text-sm transition-all
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary
        pointer-events-none"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputForm;
