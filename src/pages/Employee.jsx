import React, { useEffect, useState, useRef } from "react";
import { DateInput, Header } from "../components";
import {
  GridComponent,
  Resize,
  Search,
  Toolbar,
  ColumnDirective,
  Selection,
  ColumnsDirective,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ordersData, ordersGrid } from "../data/dummy";
import "@syncfusion/ej2-react-grids/styles/material.css";
import DateRange from "../components/DateRange";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Pdf from "../components/Pdf";
import { Button } from "@syncfusion/ej2-react-buttons";
import axios from "axios";
import { FaCheck } from 'react-icons/fa';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';



function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");





  useEffect(() => {
 
    axios
      .get(
        'https://www.globalpayng.com/new-admin/v1/settlement/?subscribed=false',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {

        const table = (response.data.data.list)
        setData(table);
        console.log(response.data.data.list);
      
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);


  const tableGrid = [
    {
      field: "fullname",
      headerText: "Full Name",
      textAlign: "Center",
      width: "300",
    },

    {
      field: "businessname",
      headerText: "Business Name",
      textAlign: "Center",
      width: "300",
    },
    {
      field: "username",
      headerText: "Username",
      textAlign: "Center",
      width: "300",
    },
    {
      field: "walletid",
      headerText: "Wallet Id",
      textAlign: "Center",
      width: "150",
    },
    {
        field: "auto_settle",
        headerText: "Auto Settlement ",
        textAlign: "Center",
        width: "150",
      },
    {
      field: "bankname",
      headerText: "Bank Name",
      textAlign: "Center",
      width: "300",
    },
    {
      field: "accountnumber",
      headerText: "Account Number",
      textAlign: "Center",
      width: "250",
    },


    {
      field: "phonenumber",
      headerText: "Phone Number",
      textAlign: "Center",
      width: "250",
    },

    {
      field: "amount",
      headerText: "Amount",
      textAlign: "Center",
      width: "250",
    },
  ]

  const handleSubscribe = () => {

    axios
      .put(
        'https://3.21.139.203/new-admin/v1/settlement/',
        {
          status: true,
          wallets: selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
     
        axios
          .get(
            `https://3.21.139.203/new-admin/v1/settlement/?subscribed=false`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setData(response.data.data.list);
          
            setSelectedItems([]);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function formatDateWithOffset(timestamp, timezoneOffset) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Convert the timestamp to a Date object
    const date = new Date(timestamp);
    date.setHours(date.getHours() + timezoneOffset);

    // Format the date and time
    return date.toLocaleString("en-US", options);
  }
  const timezoneOffset = -1;

  // Function to handle item selection
  const handleItemSelect = (walletId) => {
    setData((prevData) => {
      return prevData.map((item) =>
        item.walletid === walletId ? { ...item, isChecked: !item.isChecked } : item
      );
    });
  
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(walletId)) {
        // Deselect item if already selected
        return prevSelectedItems.filter((id) => id !== walletId);
      } else {
        // Select item if not selected
        return [...prevSelectedItems, walletId];
      }
    });
  };

  return (
    <div
    className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
    style={{ overflowX: "auto" }}

  >
    <Header category="View State" title="State" />


    <div className="overflow-x-scroll" style={{ overflowX: "auto" }}>
      <GridComponent
        toolbar={["Search"]}
        id="gridcomp"
       
        dataSource={data}
        allowPaging
        pageSettings={{ pageSize: 100 }}
        allowSorting
        allowPdfExport={true}
        pdfExportFileName='TransactionReport'
        pdfExportPageOrientation='Landscape'
        pdfExportPageSize='A3'
        allowExcelExport={true}
        excelExportFileName='TransactionReport'
        
        
      >
          <ColumnsDirective>
            
          <ColumnDirective
    headerText=''
    width='50'
    template={(rowData) => {
      return <CheckBoxComponent
        checked={rowData.isChecked}
        change={() => handleItemSelect(rowData.walletid)}
      />;
    }}
/>

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
      
      <div className="w-full flex justify-end p-4 ">
        <button className="bg-green-400 p-2 rounded-xl text-white" onClick={handleSubscribe}> 
          Suscribe
        </button>
        
      </div>
  </div>
  );
}

export default Orders;
