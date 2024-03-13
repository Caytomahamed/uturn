import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Booking',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 92, 192, 1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const MyLineChart = () => {
  return (
    <Line
      data={data}
      options={options}
      style={{ height: '100%', resize: 'contain' }}
    />
  );
};

export default MyLineChart;
