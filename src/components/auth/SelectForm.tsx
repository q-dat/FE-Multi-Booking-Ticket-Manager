import React from 'react';
import { Select } from 'react-daisyui';

const SelectForm: React.FC<{ title: string; data: { name: string }[] }> = ({
  data,
  title
}) => {
  return (
    <Select>
      <option hidden defaultValue={1} value="">
        {title}
      </option>
      {data.map(e => (
        <option>{e.name}</option>
      ))}
    </Select>
  );
};

export default SelectForm;
