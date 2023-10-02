import React, { useRef, useState, useEffect, HTMLAttributes } from "react";

type CounterProps = {
    target: number;
    increment?: number;
    percent?: boolean
    duration?: number;
} & HTMLAttributes<HTMLElement>

const Counter: React.FC<CounterProps> = ({ percent = false, target = 100, increment = Math.ceil(target / 100), duration = 1250, ...props }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const numberRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!numberRef.current) return;

        let startValue = 0;
        const steps = Math.ceil(target / increment);
        const interval = setInterval(() => {
            if (startValue >= target) {
                clearInterval(interval);
            } else {
                startValue += increment;
                setCurrentValue(startValue);
            }
        }, duration / steps);

        return () => {
            clearInterval(interval);
        };
    }, [target, increment, duration]);

    return (

        <h1 {...props} className={`${props.className ? props.className : ''}`} ref={numberRef}>{percent ? `${target}%` : currentValue}</h1>
    );
};

export default Counter;