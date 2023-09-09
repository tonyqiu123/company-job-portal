import React, { HTMLAttributes } from 'react';
import 'src/css/shared/input.css';

type InputProps = {
    type?: string; // Added 'type' prop
    placeHolder?: string;
    darkMode?: boolean;
    fullWidth?: boolean;
    iconSrc?: string;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
} & HTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
    type = 'text', // Default to 'text' if not specified
    search,
    setSearch,
    placeHolder = 'Search',
    darkMode = false,
    fullWidth,
    iconSrc,
    ...props
}) => {
    return (
        <div className={`inputContainer ${props.className}`}>
            {iconSrc && <img alt='' width={16} height={16} src={iconSrc} />}
            <input
                type={type} // Use the 'type' prop here
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeHolder}
                className={`input ${darkMode ? 'darkMode' : ''} ${iconSrc ? 'inputWithImg' : ''} ${
                    fullWidth ? 'fullWidth' : ''
                }`}
            />
        </div>
    );
};

export default Input;
