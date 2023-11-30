import React, { useEffect, useState, useRef } from "react";
import { Header } from "../components";


import "@syncfusion/ej2-react-grids/styles/material.css";

import "jspdf-autotable";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";



function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);



  
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");





  useEffect(() => {
 
    axios
      .get(
        'https://www.globalpayng.com/new-admin/v1/settlement/?subscribed=true',
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
      field: "last_settled_at",
      headerText: "Last Settled",
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
        'https://www.globalpayng.com/new-admin/v1/settlement/',
        {
          status: false,
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
          toast.success('User(s) unsubscribed successfully', {
            position: 'top-right',
            duration: 10000
          });
        }
       
        axios
          .get(
            `https://www.globalpayng.com/new-admin/v1/settlement/?subscribed=true`,
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
        item.walletid.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];




  return (
    <div
    className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "
    style={{ overflowX: "auto" }}

  >
    <Header category="Suscribed Users" title="Auto Settlement" />
      <div className="  flex justify-end items-center w-full">
        <input placeholder="search" className="border-none focus:outline-none focus:shadow-outline border-b-2 border border-pink-500 p-2" type="text" value={searchQuery} onChange={handleSearch} name="" id="" />
     
      </div>
      

    <div className="overflow-x-scroll" style={{ overflowX: "auto" }}>
 

<div className="container mx-auto">
      <table className="  w-[2700px] bg-white border border-gray-300">
        <thead>
              <tr className="text-xs items-center flex-row">
              <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b w-[300px]">Fullname</th>
                <th className="py-2 px-4 border-b w-auto ">Business Name</th>
                 <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">wallet Id</th>
                <th className="py-2 px-4 border-b">Auto settlement</th>
                <th className="py-2 px-4 border-b">Bank Name</th>
                 <th className="py-2 px-4 border-b">Account Number</th>
                <th className="py-2 px-4 border-b">Phone number</th>
                 <th className="py-2 px-4 border-b">Last Settled</th>
                {/* Add more header columns as needed */}
          </tr>
        </thead>
        <tbody className="text-xs items-center text-center justify-center mx-auto">
        {filteredData.map(item => ( 
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
              <td className="py-2 px-4 border-b text-center">{item.walletid}</td>
              <td className="py-2 px-4 border-b text-center">{item.auto_settlement}</td>
              <td className="py-2 px-4 border-b items-center justify-center text-center">{item.bankname}</td>
              <td className="py-2 px-4 border-b">{item.accountnumber}</td>
              <td className="py-2 px-4 border-b">{item.phonenumber}</td>
              <td className="py-2 px-4 border-b">{item.last_settled}</td>

          
            </tr>
          ))}
        </tbody>
      </table>
    </div>


        
      </div>
      
      <div className="w-full flex justify-end p-4 ">
        <button className="bg-red-500 p-2 rounded-xl text-white" onClick={handleSubscribe}> 
          Unsuscribe
        </button>
        
      </div>
      <Toaster position="top-right" />
  </div>
  );
}

export default Orders;



  