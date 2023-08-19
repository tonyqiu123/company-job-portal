import React from 'react';
import Input from './Input';

interface CheckboxProps {
  label: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, setChecked }) => {
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className='checkboxContainer row'>
      <input type='checkbox' checked={checked} onChange={handleChange} />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
