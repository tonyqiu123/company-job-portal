import React from 'react';
import Tooltip from '../shared/Tooltip';

interface MonthlyStatProps {
    stat: number;
    prevStat: number;
    header: string;
    toolTipText: string;
}

const MonthlyStat: React.FC<MonthlyStatProps> = ({
    stat,
    prevStat,
    header,
    toolTipText,
}) => {

    const formattedStat = (stat: number | string) => {
        return Number.isInteger(stat) ? stat : `${stat}%`;
    }

    const calculateDifference = (current: number, previous: number) => {
        const difference = current - previous;
        const percentage = ((difference / previous) * 100).toFixed(2);
        const formattedDifference = difference.toFixed(2);
        const formattedPercentage = percentage;

        // Add '+' symbol if the difference is positive
        const signedDifference = difference >= 0 ? `+${formattedDifference}` : formattedDifference;

        return {
            difference: signedDifference,
            percentage: formattedPercentage,
        };
    }

    const { difference, percentage } = calculateDifference(stat, prevStat);
    
    const differenceValue = Number(difference);

    let diffClass = 'grey';
    if (differenceValue > 0) {
        diffClass = 'green';
    } else if (differenceValue < 0) {
        diffClass = 'red';
    }

    

    return (
        <div className="dashboard-overviewStat column">
            <Tooltip toolTipText={`${toolTipText}`}>
                <h6>{header}</h6>
            </Tooltip>
            <h2>{formattedStat(stat)}</h2>
            <p className={diffClass}>{`${difference} (${percentage}%) past month`}</p>
        </div>
    );
};

export default MonthlyStat;
