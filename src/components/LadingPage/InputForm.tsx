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
        className={`peer bg-white text-black dark:bg-gray-700 dark:text-white border border-gray-700 border-opacity-50 w-full focus:outline-none focus:border-primary  dark:border-primary dark:focus:border-white ${className}`}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        className="absolute left-2 -top-2 dark:bg-gray-700 bg-white py-0 px-1 dark:text-white text-primary text-sm transition-all rounded-sm
        peer-placeholder-shown:rounded-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2 peer-focus:text-sm dark:peer-placeholder-shown:text-white dark:peer-focus:text-white peer-focus:text-primary
        pointer-events-none"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputForm;
