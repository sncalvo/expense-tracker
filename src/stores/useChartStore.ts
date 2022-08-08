import create from 'zustand';

import type { ChartData } from 'chart.js';

interface ChartStoreProps {
  data: ChartData;
  setData: (data: ChartData) => void;
}

export const useChartStore = create<ChartStoreProps>((set) => ({
  data: {
    labels: [],
    datasets: [],
  },
  setData: (data) => set((state) => ({ ...state, data })),
}));
