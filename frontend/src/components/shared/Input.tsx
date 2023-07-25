import React from 'react';

interface InputProps {
  handleState: (value: any) => void;
  placeholder: string;
  type?: string
}

const FilterInput: React.FC<InputProps> = ({ handleState, placeholder, type='text' }) => (
  <input
    type={type}
    onChange={e => handleState(e.target.value)}
    placeholder={placeholder}
  />
);

export default FilterInput;
