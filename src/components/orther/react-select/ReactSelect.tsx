import React from 'react';
import Select, { components } from 'react-select';
import { useController, Control } from 'react-hook-form';
import { IoCaretDownSharp } from 'react-icons/io5';

interface Option {
  value: string;
  label: string;
}

interface ReactSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
}

const ReactSelect: React.FC<ReactSelectProps> = ({
  name,
  control,
  options,
  placeholder = '',
  isMulti = false,
  className = ''
}) => {
  const {
    field: { onChange, value, ref }
  } = useController({
    name,
    control,
    defaultValue: isMulti ? [] : ''
  });

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      backgroundColor: 'transparent',
      minHeight: '46px',
      fontSize: '12px',
      boxShadow: 'none',
      borderRadius: '0'
    }),

    option: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      color: '#122969',
      fontSize: '14px',
      cursor: 'pointer'
    }),

    singleValue: (provided: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
      color: 'black',
      fontWeight: 'bold',
      cursor: 'pointer'
    }),

    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? 'white' : 'black',
      whiteSpace: 'nowrap',
      flexGrow: 1
    })
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <IoCaretDownSharp className="text-primary" />
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      ref={ref}
      value={
        isMulti
          ? options.filter(option => (value as string[]).includes(option.value))
          : options.find(option => option.value === value) || null
      }
      onChange={val => {
        if (isMulti) {
          onChange(val ? (val as Option[]).map(option => option.value) : []);
        } else {
          onChange((val as Option)?.value);
        }
      }}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      className={`min-w-[150px] rounded-md border border-primary bg-white text-black hover:border-gray-900 hover:border-opacity-50 focus:border-primary focus:outline-none xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full ${className}`}
      styles={customStyles}
      components={{ DropdownIndicator }}
    />
  );
};

export default ReactSelect;

