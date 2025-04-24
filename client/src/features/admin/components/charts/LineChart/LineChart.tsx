import { LineChart as Chart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';


interface LineChartProps {
  data: any[];
  primaryKey: string;
  secondaryKey: string;
};


export const LineChart: React.FC<LineChartProps> = ({
  data, primaryKey, secondaryKey, 
}) => {
  const { t } = useTranslation();

  const transformedData = data.map((item) => ({
    ...item,
    _id: t(item._id),
  }));

  return (
    <ResponsiveContainer width='100%' height={400}>
      <Chart data={transformedData}>
        <XAxis dataKey='_id' />
        <YAxis />
        <Line type='monotone' dataKey={primaryKey} stroke='#8884d8' />
        <Line type='monotone' dataKey={secondaryKey} stroke='#271fba' />
      </Chart>
    </ResponsiveContainer>
  );
};