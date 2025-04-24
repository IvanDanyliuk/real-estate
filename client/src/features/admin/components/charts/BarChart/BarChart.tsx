import { BarChart as Chart, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';


interface BarChartProps {
  data: any[];
  primaryKey: string;
  secondaryKey: string;
};


export const BarChart: React.FC<BarChartProps> = ({
  data,
  primaryKey,
  secondaryKey
}) => {
  const transformedData = data.map((item) => ({
    name: item._id,
    primaryKey: item[primaryKey],
    secondaryKey: item[secondaryKey],
  }));

  return (
    <ResponsiveContainer width='100%' height={400}>
      <Chart data={transformedData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Bar dataKey='primaryKey' fill='#8884d8' />
        <Bar dataKey='secondaryKey' fill='#271fba' />
      </Chart>
    </ResponsiveContainer>
  );
};