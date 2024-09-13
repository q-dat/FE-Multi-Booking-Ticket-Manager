import React from 'react';

const LabelForm: React.FC<{ title: string }> = ({ title }) => {
  return (
    <label className="font-sub text-sm font-light text-black dark:text-white sm:text-lg">
      {title}
    </label>
  );
};

export default LabelForm;
