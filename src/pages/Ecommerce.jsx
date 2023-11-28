import React, { useState, useEffect } from "react";
import { GoDot } from "react-icons/go";
import { Stacked, Pie, Button, SparkLine } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
  recentTransactions,
} from "../data/dummy";
import { BsCurrencyDollar } from "react-icons/bs";
import CopyToClipboard from "../components/CopytoClipboard";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import Budget from "../assets/budget.png";
import Transfer from "../assets/transfer.png";
import PieChart from "../components/PieChart";
import HomeIcon from "../assets/icon.svg";
import Upload from "../assets/upload.png";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import {
  FaCheckCircle,
  FaCreditCard,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaMoneyBill,
  FaShoppingCart,
  FaTerminal,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { MdPieChart, MdSwapHoriz } from "react-icons/md";
import BarChart from "../components/BarChart";
import "font-awesome/css/font-awesome.min.css";
import FileUploader from "../components/File";

// linense key = ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5bdURjXn9WcXFUQ2Bf

// charts
// color combination
// pie chart too plain

const Ecommerce = () => {
  return (
    <div className="mt-12">
      <div className="w-[85%]  dark:text-gray-200 dark:bg-secondary-dark-bg grid mx-auto h-[500px]  md:justify-center  bg-white rounded-md">
        <div className="w-[100%] p-6  ">
          <form action="">
            <input className="" type="file" name="file" id="" hidden />
            <div className="justify-center mx-auto  w-8 h-8 ">
              <div className="w-full justify-center mx-auto">
                <img src={Upload} alt="" />
              </div>
            </div>
            <FileUploader />

            <div className="mt-[100px]">
            <p>browse File to Upload</p>

            </div>
            
            

          </form>
        
        
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Ecommerce;
