import { Box } from '@mui/material';
import { BarChart as Chart, XAxis, YAxis, Bar } from 'recharts';


interface BarChartProps {
  data: any[];
  nameExtractor: (item: any) => string;
  value1: string;
  value2: string;
}


export const BarChart: React.FC<BarChartProps> = ({
  data,
  nameExtractor,
  value1,
  value2
}) => {
  const transformedData = data.map((item) => ({
    name: nameExtractor(item),
    value1: item[value1],
    value2: item[value2],
  }));

  return (
    <Box>
      <Chart width={800} height={500} data={transformedData}>
        <XAxis dataKey='name' />
        <Bar dataKey='value1' fill='#8884d8' />
        <Bar dataKey='value2' fill='#271fba' />
      </Chart>
    </Box>
  );
};