import * as React from "react";
import { useEffect, useState } from "react";
import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";
// import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

const DateRange = ({onDateRangeChange}) => {


  const [startDate, setStartDate] = useState(null)
  
  const [endDate, setEndDate] = useState(null)


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


function getToday() {
  const today = new Date();
  return new Date(today.toDateString());
}

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(yesterday.toDateString());
}

function getLastWeek() {
  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - ((today.getDay() + 7) % 7) - 7);
  lastWeekStart.setHours(0, 0, 0, 0);

  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
  lastWeekEnd.setHours(23, 59, 59, 999);

  return { start: lastWeekStart, end: lastWeekEnd };
}

function getLast30Days() {
  const today = new Date();
  const last30DaysStart = new Date(today);
  last30DaysStart.setDate(today.getDate() - 30);
  last30DaysStart.setHours(0, 0, 0, 0);

  const last30DaysEnd = new Date(today);
  last30DaysEnd.setHours(23, 59, 59, 999);

  return { start: last30DaysStart, end: last30DaysEnd };
}

const last30DaysDates = getLast30Days();

  const weekStart = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 7))
    ).toDateString()
  );
  const weekEnd = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() + 6
      )
    ).toDateString()
  );

  const monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
  const monthEnd = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
    ).toDateString()
  );
  const lastStart = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ).toDateString()
  );
  const lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());



  const thisMonthStart = new Date(new Date(new Date().setDate(1)).toDateString());
  const thisMonthEnd = new Date(
    new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString()
  );
  
  // Calculate the start and end dates for "Last Month"
  const lastMonthStart = new Date(
    new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString()
  );
  const lastMonthEnd = new Date(new Date(new Date().setDate(0)).toDateString());
  
  const handleApplyClick = () => {


    
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      onDateRangeChange(formattedStartDate, formattedEndDate);

    }
    
    else {
      // If no date range is selected, clear the previous selection
      onDateRangeChange(null, null);
    }
   
    }

  

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="datepicker-control-section flex">
          <div className="w-[70%]">
            <DateRangePickerComponent placeholder="Select a range"
              startDate={startDate}
              endDate={endDate}
              change={(args) => {
                if (args.startDate && args.endDate) {
                  setStartDate(args.startDate);
                  setEndDate(args.endDate);
                  handleApplyClick(); // Call your apply function when both dates are selected
                } else {
                  // Handle the case when the user opens the calendar without selecting new dates
                  // For example, you can clear the previous selection
                  setStartDate(null);
                  setEndDate(null);
                }
              }}
          >
            <PresetsDirective>
         

<PresetDirective label="Today" start={getToday()} end={getToday()}></PresetDirective>
                <PresetDirective label="Yesterday" start={getYesterday()} end={getYesterday()}></PresetDirective>
                

{/* const lastWeekDates = getLastWeek();
<PresetDirective label="Last Week" start={lastWeekDates.start} end={lastWeekDates.end}></PresetDirective>

*/}
{/*                 
 <PresetDirective label="Last 30 Days" start={last30DaysDates.start} end={last30DaysDates.end}></PresetDirective>  */}

              <PresetDirective
                label="This Week"
                start={weekStart}
                end={weekEnd}
              ></PresetDirective>

              {/* <PresetDirective
                label="Last 30 days"
                start={last30DaysStart}
                end={last30DaysEnd}
              ></PresetDirective> */}
              <PresetDirective
                label="This Month"
                start={monthStart}
                end={monthEnd}
                ></PresetDirective>
                
                <PresetDirective label="Last Month" start={lastMonthStart} end={lastMonthEnd}></PresetDirective>
{/* <PresetDirective label="Last Month" start={lastMonthDates.start} end={lastMonthDates.end}></PresetDirective> */}


{/* <PresetDirective label="Last Month" start={lastMonthStart} end={lastMonthEnd}></PresetDirective> */}
              {/* <PresetDirective
                label="Last Month"
                start={lastStart}
                end={lastEnd}
              ></PresetDirective> */}
            </PresetsDirective>
          </DateRangePickerComponent>
          </div>
          <div className="w-[30%] mx-auto items-center my-auto justify-center align-middle pb-3 relative text-center">
            

            <button
              className=" w-[60px]   md:w-[80px] pb-2 h-[30px] text-sm rounded-xl bg-gray-400 text-white"
              onClick={handleApplyClick}> Apply </button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default DateRange;
