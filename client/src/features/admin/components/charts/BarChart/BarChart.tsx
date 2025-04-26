import { useTranslation } from 'react-i18next';
import { BarChart as Chart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip } from '../CustomTooltip/CustomTooltip';


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
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={primaryKey} fill='#8884d8' />
        <Bar dataKey={secondaryKey} fill='#271fba' />
      </Chart>
    </ResponsiveContainer>
  );
};