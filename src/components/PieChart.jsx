import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import DateRange from "./DateRange";

function PieChart() {


  const getCurrentMonthDates = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1 to get the current month
  
    // Calculate the first day of the current month
    const startDay = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
  
    // Calculate the last day of the current month
    const lastDay = new Date(currentYear, currentMonth, 0);
    const endDay = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${lastDay.getDate()}`;
  
    return {
      startDate: startDay,
      endDate: endDay,
    };
  };


  const { currentMode } = useStateContext();
  const token = localStorage.getItem("token");
  const [selectedDateRange, setSelectedDateRange] = useState(getCurrentMonthDates());
  const [chartData, setChartData] = useState([]);

  const handleDateRangeChange = (start, end) => {
    setSelectedDateRange({ startDate: start, endDate: end });
  };

  useEffect(() => {
    if (selectedDateRange) {
      axios
        .get(
          `https://globalpay-merchant.onrender.com/api/dashboard/transaction-details/?start_date=${selectedDateRange.startDate}&end_date=${selectedDateRange.endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          console.log(response);

          const pieData = response.data.data;

          const pieSeries = [
            pieData.totalPurchaseAmount,
            pieData.totalTransferAmount,
            pieData.othersAmount,
          ];

          setChartData(pieSeries);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedDateRange, token]);
const test = [54, 67, 98]
const formatTotalValue = (value) => {
  // Round the value and convert it to a string without decimal places
  return Math.round(value).toString();
};

  return (
    <div className="dark:text-gray-200">
      <div className="mx-auto w-full p-2">
        {/* <DateInput />
         */}
        <DateRange
          selectedDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <Chart
        type="donut"
        width={250}
        height={250}
        series={chartData}
        formatter={formatTotalValue}
        options={{
          labels: ["Purchase", "Transfer", "Others"],
          legend: {
            position: "bottom",
            fontFamily: "Quicksand, sans-serif",// Set position to 'bottom' for labels below the chart
          },
          fontFamily: "Quicksand, sans-serif",
          colors: ["#03c3ec", "#6610f2", "#20c997"],

          // dataLabels: {
          //   style: {
          //   },
          // },
          plotOptions: {
            pie: {
              size: 200, // Adjust the radius here (e.g., '60%')
              
              donut: {
                size: "45%",
                
                labels: {
                  show: true,
                  style: {
                    colors: ["#71dd37", "#20c997", "#71dd37"], 
                    fill: {
                      colors: ['#F44336', '#E91E63', '#9C27B0']
                    },
                    fontFamily: "Quicksand, sans-serif",

                    
                  },
                  formatter: function (value) {
                    return value + "$";
                  },
                  name: {
                    show: true,
                    fontSize: "14px", // Adjust the font size
                    fontFamily: "Quicksand, sans-serif",
                    // colors: ["#71dd37", "#20c997", "#71dd37"], // Set colors for each label
                  },
                  value: {
                    show: true,
                    fontSize: "14px", // Adjust the font size
                    fontFamily: "Quicksand, sans-serif",
                    formatter: function (val) {
                      return Math.round(val);
                    },
                  },
                  total: {
                    show: true,
                    label: "Total",
                    color: "#333",
                    position: "bottom",
                    fontFamily: "Quicksand, sans-serif",
                    
                   
                    // Set the color for the total label
                  },
                  fill: {
                    colors: ['#F44336', '#E91E63', '#9C27B0']
                  },

                  
                  
                },
              },
            },
          },
          total: {
            show: true,
            formatter: function (val) {
              return Math.round(val);
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
