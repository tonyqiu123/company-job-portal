interface DataItem {
  [key: string]: number | string; // Adjust this type definition based on the actual data structure
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

function calculateDifference(current: number, previous: number): number {
  return current - previous;
}

function colorCode(current: number, previous: number): string {
  if (current > previous) return 'green';
  if (current < previous) return 'red';
  
  return 'grey';
}

function getDaysInMonth(month: string, year: number): number {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNumber = monthNames.indexOf(month);
  return new Date(year, monthNumber + 1, 0).getDate();
}


function DataCard({ data }: DataCardProps): JSX.Element {
  const keys = Object.keys(data[0]).filter(
    key => key !== "__v" && key !== "_id" && typeof data[0][key] === "number"
  );

  return (
    <div className="data-card-container">
      {keys.map((key) => {
        const lastData = data[data.length - 1][key] as number;
        const previousData = data[data.length - 2][key] as number;
        return (
          <div className="data-card" key={key}>
            <h2>{key}</h2>
            <p>{lastData}</p>
            <p style={{ color: colorCode(lastData, previousData) }}>
              {calculatePercentage(lastData, previousData)} ({calculateDifference(lastData, previousData)})
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DataCard;
