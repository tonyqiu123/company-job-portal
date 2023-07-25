import React, { ChangeEvent } from 'react';

interface SelectDropdownProps {
  handleSetState: (value: any) => void;
  values: string[]
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ handleSetState, values }) => {
  return (
    <select onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSetState(e.target.value)}>
      {values.map((value, index) => {
        return <option key={index} value={value}>{value}</option>
      })}
    </select>
  )
};

export default SelectDropdown;
