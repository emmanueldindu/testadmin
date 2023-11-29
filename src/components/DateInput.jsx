import React, { useState } from "react";
import Button from "./Button";
import {
  format,
  
  subDays,
  startOfWeek,
  endOfWeek,
  
  subMonths,
} from "date-fns";

const DateInput = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [label, setLabel] = useState("");

  const handleDateClick = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleDateSelection = (range) => {
    const today = new Date();
    let label = "";
    switch (range) {
      case "today":
        setStartDate(today);
        setEndDate(today);
        label = "Today ";
        break;
      case "yesterday":
        setStartDate(subDays(today, 1));
        setEndDate(subDays(today, 1));
        label = "Yesterday";
        break;
      case "lastWeek":
        setStartDate(startOfWeek(subDays(today, 7)));
        setEndDate(endOfWeek(subDays(today, 7)));
        label = " Last 7 Days";
        break;

      case "thisMonth":
        const thisMonthStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const thisMonthEnd = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        setStartDate(thisMonthStart);
        setEndDate(thisMonthEnd);
        label = "This Month";
        break;
      case "lastMonth":
        const lastMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        setStartDate(lastMonthStart);
        setEndDate(lastMonthEnd);
        label = "Last Month";
        break;

      case "oneMonthAgo":
        setStartDate(subMonths(today, 1));
        setEndDate(today);
        label = "Last 30 Days";
        break;
      default:
        // Handle custom range logic here
        break;
    }

    // Close the options after selection
    setOptionsVisible(false);

    setLabel(label);
  };

  const handleCustomStartDateChange = (e) => {
    setCustomStartDate(new Date(e.target.value));
  };

  const handleCustomEndDateChange = (e) => {
    setCustomEndDate(new Date(e.target.value));
  };

  // const handleCustomRangeSelection = () => {
  //   if (customStartDate && customEndDate) {
  //     setStartDate(customStartDate);
  //     setEndDate(customEndDate);
  //     setOptionsVisible(false);
  //   }
  // };

  return (
    <div>
      <div className="date-display" onClick={handleDateClick}>
        {startDate && endDate ? (
          <div>
            {format(startDate, "MMM d")} - {format(endDate, "MMM d")}
            {label && <div>{label}</div>}
          </div>
        ) : (
          "Select Date"
        )}
      </div>

      {isOptionsVisible && (
        <div className="grid p-2 place-items-start h-[250px] relative text-sm w-[150px]  bg-white shadow-2xl ">
          <button onClick={() => handleDateSelection("today")}>Today</button>
          <button onClick={() => handleDateSelection("yesterday")}>
            Yesterday
          </button>
          <button onClick={() => handleDateSelection("lastWeek")}>
            Last Week
          </button>
          <button onClick={() => handleDateSelection("oneMonthAgo")}>
            One Month Ago
          </button>
          <button onClick={() => handleDateSelection("thisMonth")}>
            This Month
          </button>
          <button onClick={() => handleDateSelection("lastMonth")}>
            Last Month
          </button>
          <label htmlFor="">Custom date</label>
          {/* <input
            type="date"
            value={customStartDate ? format(customStartDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <input
            type="date"
            value={customEndDate ? format(customEndDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          /> */}
          {/* <button onClick={handleCustomRangeSelection}>
            Apply Custom Range
          </button> */}
        </div>
        
      )}
    </div>
  );
};

export default DateInput;
