import { useChartStore } from '@stores';
import type { ChartData } from 'chart.js';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const DynamicDoughnut = dynamic(() => import('../atoms/Doughnut'), {
  suspense: true,
  loading: () => <div>Loading...</div>,
});

interface Props {
  data: ChartData<'doughnut'>;
}

export const DoughnutChart: React.FC<Props> = ({ data }) => {
  const setData = useChartStore(({ setData }) => setData);

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  return <DynamicDoughnut />;
};
