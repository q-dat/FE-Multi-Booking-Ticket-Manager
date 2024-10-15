import React from 'react';

const LabelForm: React.FC<{ title: string }> = ({ title }) => {
  return <label className="mt-1 text-black dark:text-white">{title}</label>;
};

export default LabelForm;
