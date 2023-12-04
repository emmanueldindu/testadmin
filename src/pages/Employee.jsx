import React, { useEffect, useState,  } from "react";
import { Header } from "../components";
import { toast, Toaster } from 'react-hot-toast';


import "@syncfusion/ej2-react-grids/styles/material.css";
import "jspdf-autotable";


import axios from "axios";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faPrint } from '@fortawesome/free-solid-svg-icons';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import Pagination from "../components/Pagination"


function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)


  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const [selectedTerminal, setSelectedTerminal] = useState({});

 
  



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





  const handleSubscribe = () => {

    axios
      .put(
        'https://www.globalpayng.com/new-admin/v1/settlement/',
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

        if (response.status === 200) {
          toast.success('User(s) Subscribed successfully', {
            position: 'bottom-center',
            duration: 10000
          });
        }
     
        axios
          .get(
            `https://www.globalpayng.com/new-admin/v1/settlement/?subscribed=false`,
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


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data
  ? data.filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.businessname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.walletid.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];
   const PAGE_SIZE = 30
const [currentpage, setCurentpage] = useState(1)
  const totalcount = filteredData.length
  const firstpage = (currentpage - 1) * PAGE_SIZE
  const lastpage = firstpage + PAGE_SIZE
  const currentTableData = filteredData.slice(firstpage, lastpage)


   const handleTerminalChange = (tids, terminalId) => {
    setData((prevData) => {
      return prevData.map((item) =>
        item.tids === tids ? { ...item, selectedTerminal: terminalId } : item
      );
    });
  
    setSelectedTerminal((prevSelectedTerminal) => {
      return { ...prevSelectedTerminal, [tids]: terminalId };
    });
  };

    const getTerminalIds = (tids) => {
    // Replace this with your actual API call or logic
    // You might want to filter the terminal IDs based on the selected user (item.tids)
    // For now, using a static array for demonstration
    return ['Terminal1', 'Terminal2', 'Terminal3'];
  };


  const handleDownloadPDF = () => {
    const pdfWidth = 800; // Set the desired page width
    const pdf = new jsPDF({
      unit: 'px',
      format: [pdfWidth, 792], // Specify the width and height of the page
    });
  
    pdf.text("Auto Settlement Users", 10, 10); // Add title if needed
  
    const columns = ["Fullname", "Business Name", "Username", "Wallet Id", "Terminal Id", "Bank Name", "Account Number", "Phone Number"];
    
    // Set column widths (adjust as needed)
    const columnWidths = [80, 100, 80, 60, 150, 120, 120, 120];
    
    const rows = currentTableData.map(item => [
      item.fullname, item.businessname, item.username, item.walletid, 
      item.tids.join(', '), item.bankname, item.accountnumber, item.phonenumber
    ]);
  
    pdf.autoTable({
      head: [columns],
      body: rows,
      theme: 'striped',
      columnStyles: { 0: { cellWidth: columnWidths[0] }, 1: { cellWidth: columnWidths[1] }, /* ... */ },
    });
  
    pdf.save("Globalpay.pdf");
  };
  

  const handleDownloadExcel = () => {
    const wsData = currentTableData.map(item => ({
      Fullname: item.fullname,
      'Business Name': item.businessname,
      Username: item.username,
      'Wallet Id': item.walletid,
      'Terminal Id': item.tids.join(', '), // Join the array of tids into a string
      'Bank Name': item.bankname,
      'Account Number': item.accountnumber,
      'Phone Number': item.phonenumber,
    }));
  
    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Globalpay.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <div
    className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
    style={{ overflowX: "auto" }}

  >
      <Header category="Unsuscribed Users" title="Non auto" />
      <div className="  flex justify-between items-center w-full">
      <div className="  flex-row  "> 
        <button  onClick={handleDownloadPDF}>
          <FontAwesomeIcon color="red" size="x" className="mx-2" icon={faFilePdf} />
            </button>
            <button onClick={handleDownloadExcel}>
          <FontAwesomeIcon icon={faFileExcel} size="x" className="mx-2" color="green" /> 
        </button>

        <button onClick={handlePrint}>
          <FontAwesomeIcon size="x" color="blue" className="mx-2" icon={faPrint} /> 
        </button>
            </div>
      
        <input placeholder="search" className="border-none focus:outline-none focus:shadow-outline border-b-2 border border-pink-500 p-2" type="text" value={searchQuery} onChange={handleSearch} name="" id="" />
     
      </div>

  
      
    <div className="overflow-x-scroll" style={{ overflowX: "auto" }}>
 

<div className="container mx-auto">
      <table className="  w-[2000px] bg-white border border-gray-300">
        <thead>
              <tr className="text-xs items-center flex-row text-left justify-start">
              <th className="py-2 px-4 border-b w-2">Select</th>
            <th className="py-2 px-4 border-b w-[300px]">Fullname</th>
                <th className="py-2 px-4 border-b w-auto ">Business Name</th>
                 <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Wallet Id</th>
                <th className="py-2 px-4 border-b">Terminal Id</th>
                {/* <th className="py-2 px-4 border-b">Auto settlement</th> */}
                <th className="py-2 px-4 border-b">Bank Name</th>
                 <th className="py-2 px-4 border-b">Account Number</th>
                <th className="py-2 px-4 border-b">Phone number</th>
                 {/* <th className="py-2 px-4 border-b">Last Settled</th> */}
                {/* Add more header columns as needed */}
          </tr>
        </thead>
        <tbody className="text-xs items-center  justify-start text-left mx-auto">
        {currentTableData.map(item => ( 
            <tr key={item.walletid}>
                            <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleItemSelect(item.walletid)}
                />
              </td>
              <td className="py-2 px-4 border-b">{item.fullname}</td>
              <td className="py-2 px-4 border-b flex-row w-auto">{item.businessname}</td>
              <td className="py-2 px-4 border-b">{item.username}</td>
              <td className="py-2 px-4 border-b ">{item.walletid}</td>
            {/* <td className="py-2 px-4 border-b text-center">{item.auto_settlement}</td> */}
            <td className="py-2 px-4 border-b  ">
                <select
                  value={selectedTerminal[item.tids] || ''}
                  onChange={(e) => handleTerminalChange(item.tids, e.target.value)}
                >
                  <option value="" disabled>
                    Show Terminal(s)
                  </option>
                 {item.tids.map((terminal) => (
      <option key={terminal} value={terminal}>
        {terminal}
      </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4 border-b ">{item.bankname}</td>
              <td className="py-2 px-4 border-b">{item.accountnumber}</td>
              <td className="py-2 px-4 border-b">{item.phonenumber}</td>
              {/* <td className="py-2 px-4 border-b">{item.last_settled}</td> */}

          
            </tr>
          ))}
        </tbody>
          </table>
       
    </div>

  
        
      </div>
       <div>
          <Pagination
            currentPage={currentpage}
            totalCount={totalcount}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurentpage(page)}
          />
          </div>
      <div className="w-full flex justify-end p-4 ">
        <button className="bg-green-400 p-2 rounded-xl text-white" onClick={handleSubscribe}> 
        Subscribe
        </button>
        
      </div>

      <Toaster position="top-right" />
  </div>
  );
}

export default Orders;
