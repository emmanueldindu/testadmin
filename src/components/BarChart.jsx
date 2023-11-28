import React, { useEffect, useRef } from 'react';
// import {Chart} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const BarChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Purchase',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [1200, 1700, 1400, 2000, 1800, 1500, 1300, 1600, 1900, 1700, 1400, 1600],
          },
          {
            label: 'Transfer',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [800, 1300, 1100, 1600, 1400, 1200, 1000, 1500, 1300, 1100, 1400, 1200],
          },
          {
            label: 'Others',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [600, 1000, 900, 1200, 1100, 900, 800, 1000, 1100, 900, 1000, 800],
          },
        ],
    };
    


  return (
    <div>
 <h2>Monthly Comparison Chart</h2>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
