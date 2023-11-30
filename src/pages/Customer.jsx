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
   
    const apiUrl =
      'https://www.globalpayng.com/new-admin/v1/transactions/eod'

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
    
  }, [token]);

  const tableGrid = [
    {
      field: "card_holder_name",
      headerText: "Card Holder",
      textAlign: "Center",
      width: "250",
    },

    {
      field: "email",
      headerText: "Email",
      textAlign: "Center",
      width: "250",
    },
    {
      field: "tid",
      headerText: "Terminal Id",
      textAlign: "Center",
      width: "150",
    },
    {
      field: "transactiontype",
      headerText: "Transaction Type",
      textAlign: "Center",
      width: "200",
    },
    {
        field: "stan",
        headerText: "Stan",
        textAlign: "Center",
        width: "100",
      },
    {
      field: "rrn",
      headerText: "RRN",
      textAlign: "Center",
      width: "150",
    },
    {
      field: "time",
      headerText: "Time",
      textAlign: "Center",
      width: "250",
    },

  ]


  //   {
  //     field: "current_date_uzoezi",
  //     headerText: "Current Date",
  //     textAlign: "Center",
  //     width: "200",
  //   },
  //   {
  //     field: "date",
  //     headerText: "Date",
  //     textAlign: "Center",
  //     width: "200",
  //   },
  //   {
  //     field: "google_map_radio_type",
  //     headerText: "Google Map Radio Type",
  //     textAlign: "Center",
  //     width: "200",
  //   },
  //   {
  //     field: "has_battery",
  //     headerText: "Has Battery",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "last_transaction_attempt_time",
  //     headerText: "Last Transaction Time",
  //     textAlign: "Center",
  //     width: "200",
  //   },
  //   {
  //     field: "merchant_id",
  //     headerText: "Merchant Id",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "pinpad_status",
  //     headerText: "Pinpad Status",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "printer_state",
  //     headerText: "Printer State",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "processed_pads",
  //     headerText: "Processed Pads",
  //     textAlign: "Center",
  //     width: "300",
  //   },
  //   {
  //     field: "serial_number",
  //     headerText: "Serial Number",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "terminal_id",
  //     headerText: "Terminal",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "terminal_manufacturer",
  //     headerText: "Terminal Manufacturer",
  //     textAlign: "Center",
  //     width: "150",
  //   },
  //   {
  //     field: "terminal_model_name",
  //     headerText: "Terminal Model Number",
  //     textAlign: "Center",
  //     width: "150",
  //   },
 
  return (
    <div
      className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
      style={{ overflowX: "auto" }}

    >
      <Header category="" title="Terminal EOD" />
  

  

      {/* <button  className="h-6 bg-red-500 w-7"onClick={exportToExcel}>Export to Excel</button> */}
      {/* <button className='w-[120px] h-3 bg-yellow-500' onClick={exportToPDF}>Export to PDF</button> */}
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
