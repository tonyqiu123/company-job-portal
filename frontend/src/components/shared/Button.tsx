import React, { ButtonHTMLAttributes, useState } from 'react';
import "src/css/shared/button.css";
import loading from 'src/assets/images/loading.svg'

type ButtonProps = {
    text: string;
    variant: 'primary' | 'secondary' | 'outline' | 'destructive';
    imageSrc?: string
    isDisabled?: boolean;
    isFullWidth?: boolean;
    darkMode?: boolean;
    size?: 's' | 'm' | 'l'
    handleClick?: () => Promise<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    text,
    variant,
    size = 'm',
    imageSrc,
    darkMode = false,
    isDisabled = false,
    handleClick,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (!isDisabled && !isLoading && handleClick) {
            setIsLoading(true);
            try {
                await handleClick();
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        } 
    };

    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            {...props}
            className={`button ${darkMode ? 'darkMode' : ''} ${props.className ? props.className : ''} ${size} ${variant} ${isLoading ? 'loading' : ''
                }`}

        >
            <React.Fragment>
                <p>{text}</p>
                {imageSrc && <img style={{ filter: `${darkMode ? 'invert(1)' : 'invert(0)'}` }} src={imageSrc} alt='' height={14} width={14} />}
            </React.Fragment>
            <img className='loading' src={loading} alt="Loading" width={14} height={14} />
        </button>
    );
};

export default Button;