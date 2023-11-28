import React,{ useState, useEffect} from 'react'
import { DateInput, Header } from '../components'
import {GridComponent, Resize, Search, Toolbar, ColumnDirective, ColumnsDirective, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Inject,  } from '@syncfusion/ej2-react-grids'
import { ordersData, ordersGrid } from '../data/dummy'
import '@syncfusion/ej2-react-grids/styles/material.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios'
function Orders() {

  const token = localStorage.getItem('token')
  const [card, setCard] = useState(null)
  const [selectedDateRange, setSelectedRange] = useState(null)

  const handleDateRangeChange = (start, end) => {
    setSelectedRange({ startDate: start, endDate: end });

  
  }



  useEffect(() => {
    if (selectedDateRange) {
      const apiUrl = `https://globalpay-merchant.onrender.com/transactions/card?start_date=2023-05-01&end_date=2023-06-30`
    
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response)

      }).catch((err) => {
        console.log(err)
      })
    }
    },
    [selectedDateRange, token])
   return (



    <div className="m-2 pt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl overflow-x-scroll xl:w-[1000px] xl:mx-auto "  style={{ overflowX: 'auto' }}>
      <Header category='View Terminals' title="Terminals" description="list of your terminals"  />
      {/* <div className="mx-auto p-4">
        <DateInput />
      </div> */}

      {/* <button  className="h-6 bg-red-500 w-7"onClick={exportToExcel}>Export to Excel</button> */}
      {/* <button className='w-[120px] h-3 bg-yellow-500' onClick={exportToPDF}>Export to PDF</button> */}
      <div className='overflow-x-scroll' style={{ overflowX: 'auto' }}>

        <GridComponent
          toolbar={['Search']}

          id='gridcomp'
          dataSource={ordersData}
          allowPaging
          allowSorting
          // ref={gridInstanceRef}
      
        > 
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {
              ...item} />
            
          ))}
          


          </ColumnsDirective>
          <Inject services={[Sort, Resize, ContextMenu, Filter, Page, ExcelExport, Search, Toolbar, PdfExport]} />

        
      </GridComponent>
      
      </div>

      </div>
      

      )
}

export default Orders