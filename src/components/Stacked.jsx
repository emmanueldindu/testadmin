import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Stacked = () => {
  // Sample data for the line chart
  const series = [
    {
      name: "Transfer",
      data: [1200, 1700, 1400, 2000, 1800, 300, 892, 203, 0, 234, 764, 500],
    },
    {
      name: "Purchase",
      data: [800, 1300, 1100, 1600, 1400, 500, 800, 764, 950, 245, 554, 400],
    },
    {
      name: "others",
      data: [600, 1000, 900, 1200, 1100, 1350, 357, 800, 763, 880, 343, 634, 0],
    },
  ];

  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];

        const dataPromises = months.map(async (month) => {
          const startDate = `${currentYear}-${month}-01`;
          const endDate = `${currentYear}-${month}-31`;

          const response = await axios.get(
            `https://globalpay-merchant.onrender.com/api/dashboard/transaction-details/?start_date=${startDate}&end_date=${endDate}`, {
              headers: {
              Authorization: `Bearer ${token}`
            }
            }
          );

          return response.data.data;
          console.log(response.data.data)
        });

        const results = await Promise.all(dataPromises);

        const seriesData = [
          { 
            name: "Transfer",
            data: results.map((monthData) => monthData.totalTransferAmount)
          },

          {
            name: "Purchase",
            data: results.map((monthData) => monthData.totalPurchaseAmount)
          },

          {
            name: "Others",
            data: results.map((monthData) => monthData.othersAmount)
          },
        ]

        setChartData(seriesData)


      } catch (error) {
        console.log(error);
      }
    };

    fetchData()
  }, []);

  // Configuration options for the chart
  const options = {
    chart: {
      type: "line",
      height: 350,

      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      fontFamily: "Quicksand, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          
          return Math.round(value); // Round the value to a whole number
        },
      },
     
    },
    
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      
    },
    legend: {
      labels: {
        colors: "gray",
      },
    },
  };

  return (
    <div id="line-chart">
      <ReactApexChart
        options={options}
        series={chartData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Stacked;
