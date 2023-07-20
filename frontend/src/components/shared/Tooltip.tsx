import React, { useState, useEffect, useRef, ReactNode } from 'react';
import 'src/css/shared/tooltip.css'; // import some CSS
import tooltipIcon from "src/assets/images/tooltipIcon.svg"

interface TooltipProps {
    toolTipText: string;
    children?: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ toolTipText, children }) => {
    const [hovering, setHovering] = useState(false);
    const [outOfViewHorizontally, setOutOfViewHorizontally] = useState(false);
    const [outOfViewVertically, setOutOfViewVertically] = useState(false);

    const tooltipRef = useRef<HTMLParagraphElement>(null);


    const checkOutOfBounds = () => {
        if (tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            setOutOfViewHorizontally(rect.right > window.innerWidth || rect.left < 0);
            setOutOfViewVertically(rect.bottom > window.innerHeight || rect.top < 0);
        }
    };

    useEffect(() => {
        checkOutOfBounds();
        window.addEventListener("resize", checkOutOfBounds);

        // Cleanup after component unmount
        return () => {
            window.removeEventListener("resize", checkOutOfBounds);
        };
    }, []);

    return (
        <div className='tooltip row'>
            {children}
            <img src={tooltipIcon}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)} />
            <p className={`tooltip-hoverBox ${hovering && 'active'} ${outOfViewHorizontally && 'out-of-view-horizontal'} ${outOfViewVertically && 'out-of-view-vertical'}`}
                ref={tooltipRef}>
                {toolTipText}
            </p>
        </div>
    );
};

export default Tooltip;
