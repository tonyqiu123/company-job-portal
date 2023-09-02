import React, { FC, HTMLAttributes, useState } from 'react';
import 'src/css/shared/select.css';
import Button from 'src/components/shared/Button';
import Popover from 'src/components/shared/Popover';
import dropdownIcon from 'src/assets/images/dropDownIcon.svg'

type SelectProps = {
    selected: any
    setSelected: React.Dispatch<React.SetStateAction<any>>
    darkMode?: boolean;
    queries: string[]
    placeholder?: string
} & HTMLAttributes<HTMLElement>;

const Select: FC<SelectProps> = ({ selected, setSelected, darkMode = false, queries, placeholder = queries[0], ...props }) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOnClick = (query: string) => {
        setSelected(query);
        setIsOpen(false)
    }

    return (
        <Popover isOpen={isOpen} setIsOpen={setIsOpen} className={`select ${darkMode ? 'darkMode' : ''}`} {...props}>
            <Button className='selectDropdownButton' style={{ width: '100%', justifyContent: 'space-between' }} size='m' darkMode={darkMode} variant='outline' text={selected ? selected : placeholder} imageSrc={dropdownIcon} />
            <div className='selectDropdown'>
                {queries.map((query, index) => {
                    return (
                        <p onClick={() => handleOnClick(query)} key={index}>
                            {query}
                        </p>
                    )
                })}
            </div>
        </Popover>
    );
};

export default Select;