import { ArcElement, Chart, Legend, Tooltip } from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, selectFilteredAndSortedCars } from '../store/slices/carSlice';

Chart.register(ArcElement, Tooltip, Legend);

const CarTypesPieChart = () => {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const { paginatedList } = useSelector(selectFilteredAndSortedCars);

  console.log(paginatedList);

  useEffect(() => {
    const carTypesData = paginatedList.reduce((acc, car) => {
      acc[car.carType] = (acc[car.carType] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(carTypesData);
    const data = Object.values(carTypesData);

    console.log(data, labels);
    setChartData({
      labels,
      datasets: [
        {
          label: 'Poll',
          data,
          backgroundColor: ['#3f51b5', '#ff6384', '#ffce56'],
        },
      ],
    });
  }, [paginatedList]);

  console.log(chartData);

  return (
    <div style={{ width: '25rem' }}>
      <h2 style={{ marginLeft: '2rem', marginTop: '3rem' }}>
        Car Types Pie Chart
      </h2>
      {Object.keys(chartData).length > 0 && <Doughnut data={chartData} />}
    </div>
  );
};

export default CarTypesPieChart;
