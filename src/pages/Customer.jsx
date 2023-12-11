import React, { useState, useRef, useEffect } from "react";
import {  Header } from "../components";
import {
  GridComponent,
  Resize,
  Search,
  Toolbar,
  ColumnDirective,
  ColumnsDirective,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Inject,
} from "@syncfusion/ej2-react-grids";
// import { ordersData, ordersGrid } from "../data/dummy";
import "@syncfusion/ej2-react-grids/styles/material.css";
import DateRange from '../components/DateRange';
import "jspdf-autotable";
import axios from "axios";


function Orders() {
  const token = localStorage.getItem("token");
  const [state, setState] = useState(null);
  const [selectedDateRange, setSelectedRange] = useState(null);
  const gridInstance = useRef(null);

  const handleDateRangeChange = (start, end) => {
    setSelectedRange({ startDate: start, endDate: end });
  };


  const exportToPDF = () => {
    gridInstance.current.pdfExport();
  };
  
  const exportToExcel = () => {
    gridInstance.current.excelExport();
  };
  
  const printTable = () => {
    gridInstance.current.print();
  };
  



  useEffect(() => {
    // Make an initial API call when the component mounts
    const initialApiUrl = 'https://www.globalpayng.com/new-admin/v1/transactions/eod';
  
    axios
      .get(initialApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const initialTable = response.data.data;
        console.log(initialTable);
        setState(initialTable);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    if (selectedDateRange) {
      const apiUrl =
        `https://www.globalpayng.com/new-admin/v1/transactions/eod?start_date=${selectedDateRange.startDate}&end_date=${selectedDateRange.endDate}`

      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const table = response.data.data
          console.log(table);
          setState(table)
        })
        .catch((err) => {
          console.log(err);
        });
    
    }
  }, [selectedDateRange, token]);





  const tableGrid = [
    {
      field: "card_holder_name",
      headerText: "Card Holder",
      textAlign: "Left",
      width: "250",
    },

    {
      field: "email",
      headerText: "Email",
      textAlign: "Start",
      width: "250",
    },
    {
      field: "tid",
      headerText: "Terminal Id",
      textAlign: "Left",
      width: "150",
    },
    {
      field: "transactiontype",
      headerText: "Transaction Type",
      textAlign: "Left",
      width: "200",
    },
    {
      field: "amount",
      headerText: "Amount",
      textAlign: "Left",
      width: "150",
    },
    {
        field: "stan",
        headerText: "Stan",
        textAlign: "Left",
        width: "100",
      },
    {
      field: "rrn",
      headerText: "RRN",
      textAlign: "Left",
      width: "150",
    },
    {
      field: "responsecode",
      headerText: "Response code",
      textAlign: "Center",
      width: "120",
    },
    {
      field: "time",
      headerText: "Time",
      textAlign: "Left",
      width: "250",
    },

  ]


 
  return (
    <div
      className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
      style={{ overflowX: "auto" }}

    >
      <Header category="" title="Terminal EOD" />
  

  

      {/* <button  className="h-6 bg-red-500 w-7"onClick={exportToExcel}>Export to Excel</button> */}
      {/* <button className='w-[120px] h-3 bg-yellow-500' onClick={exportToPDF}>Export to PDF</button> */}
   
      <div className="mx-auto p-4">
        <DateRange 
          selectedDateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      

      <div className='w-[150px] gap-x-2 flex justify-between relative p-2'>
  <button className='w-12 h-8 text-sm rounded-md bg-blue-400 text-white' onClick={exportToPDF}>PDF</button>
  <button className='w-12 h-8 rounded-md text-sm bg-blue-400 text-white' onClick={exportToExcel}> Excel</button>
  <button  className='w-12 h-8 rounded-md text-sm bg-blue-400 text-white' onClick={printTable}>Print</button>
      </div>
   
      <div className="overflow-x-scroll" style={{ overflowX: "auto" }}>
        <GridComponent
          toolbar={["Search"]}
          id="gridcomp"
          ref={gridInstance}
          dataSource={state}
          allowPaging
          pageSettings={{ pageSize: 100 }}
          allowSorting
          allowPdfExport={true}
          pdfExportFileName='TransactionReport'
          pdfExportPageOrientation='Landscape'
          pdfExportPageSize='A3'
          allowExcelExport={true}
          excelExportFileName='TransactionReport'
          
          // ref={gridInstanceRef}
        >
          <ColumnsDirective>
            {tableGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Sort,
              Resize,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Search,
              Toolbar,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
}

export default Orders;
