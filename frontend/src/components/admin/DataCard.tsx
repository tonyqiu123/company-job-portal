import Counter from "../shared/Counter";

interface DataItem {
  [key: string]: number | string;
}

interface DataCardProps {
  data: DataItem[];
}

function calculatePercentage(current: number, previous: number): string {
  if (previous === 0 && current === 0) return '0%';
  if (previous === 0 && current !== 0) return '∞%';
  if (previous !== 0) return `${((current - previous) / previous * 100).toFixed(2)}%`;
  return '';
}



function colorCode(current: number, previous: number): string {
  if (current > previous) return 'green';
  if (current < previous) return 'red';

  return 'grey';
}

function roundToTwoDecimalPlaces(num: number): string | number {
  return Math.round(num * 100) / 100;
}


function DataCard({ data }: DataCardProps): JSX.Element {
  const keys = Object.keys(data[0]).filter(
    key => key !== "__v" && key !== "_id" && key !== "year" && typeof data[0][key] === "number"
  );

  return (
    <div className="data-card-container">
      {keys.map((key) => {
        const lastData = data[data.length - 1][key] as number;
        const previousData = data[data.length - 2][key] as number;
        return (
          <div className="data-card" key={key}>
            <h2>{key}</h2>
            <Counter style={{ fontSize: '40px' }} target={lastData} increment={1} duration={750} />
            <p style={{ fontSize: '14px', color: colorCode(lastData, previousData) }}>
              {calculatePercentage(lastData, previousData)} from last month ({(lastData - previousData) > 0 ? '+': ''}{roundToTwoDecimalPlaces(lastData - previousData)})
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DataCard;
