import React, { useState,ReactNode  } from 'react';
import 'src/css/shared/tooltip.css'; // import some CSS
import tooltipIcon from "src/assets/images/tooltipIcon.svg"

interface TooltipProps {
    toolTipText: string;
    children?: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ toolTipText, children}) => {

    const [hovering, setHovering] = useState(false)


    return (
        <div className='tooltip row'>
            {children}
            <img src={tooltipIcon}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)} />
            <p className={`tooltip-hoverBox ${hovering && 'active'}`}
            >{toolTipText}</p>
        </div>
    );
};

export default Tooltip;
