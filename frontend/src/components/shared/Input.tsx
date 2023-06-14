import React, { ChangeEvent } from 'react';

interface InputProps {
  handleState: (value: any) => void;
  placeholder: string;
}

const FilterInput: React.FC<InputProps> = ({ handleState, placeholder }) => (
  <input 
    onChange={e => handleState(e.target.value)}
    placeholder={placeholder}
  />
);

export default FilterInput;
