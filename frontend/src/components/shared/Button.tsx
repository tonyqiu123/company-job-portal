import loadingIcon from 'src/assets/images/loading.svg'
import { useState } from 'react'

interface ButtonProps {
    text: string
    primary?: boolean
    destructive?: boolean
    successButton?: boolean
    handleClick: () => Promise<void>
}

const Button: React.FC<ButtonProps> = ({ text, handleClick, primary = false, destructive = false, successButton = false }) => {

    const [btnClicked, setBtnClicked] = useState(false)


    const handleClickWithReset = () => {
        setBtnClicked(true);
        handleClick()
            .then(() => setBtnClicked(false))
            .catch(() => setBtnClicked(false) )
    };

    return (
        <button
            className={`row ${primary === true && 'primaryButton'} ${destructive === true && 'destructiveButton'} ${successButton === true && 'successButton'}`}
            style={{ opacity: btnClicked === true ? '0.7' : '1' }}
            onClick={handleClickWithReset}
        >
            <p>{text}</p>
            <img className='loadingIcon' style={{ filter: `brightness(${primary || destructive || successButton ? '1' : '50%'})`, width: '14px', display: btnClicked === true ? 'unset' : 'none' }} src={loadingIcon} />
        </button>
    );
}


export default Button