


import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const BotStatisticsChart = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default BotStatisticsChart;
