import { Doughnut } from 'react-chartjs-2';

import { useChartStore } from '@stores';
import type { ChartData } from 'chart.js';

const DoughnutChart: React.FC = () => {
  const data = useChartStore(({ data }) => data) as ChartData<'doughnut'>;

  return <Doughnut data={data} />;
};

export default DoughnutChart;
