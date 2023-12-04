import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Ecommerce, Orders, Calender, Employee, Stacked, Pyramid,  Customer, Kanban, Area,  Financial, ColorPicker, Editor, Password } from './pages';
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';


const App = () => {

  return (
    <div>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} >
          <Route path='/' element={<Orders />} />
          <Route path='/subscribed users' element={<Orders />} />
          <Route path='/unsubscribed users' element={<Employee  />} />
          <Route path='/flatfile' element={ <Ecommerce /> } />
          <Route path='/terminal eod' element={<Customer />} />
            {/* <Route path='/Terminals' element={<Kanban />} />
          <Route path='/Password Settings' element={<Password />} /> */}
          {/* <Route path='/Logout' element={<Login />}  /> */}
            {/* <Route path='/color-mapping' element={<ColorPicke} /> */}
            <Route path='/login' element={<Login />}  />
            </Route>
        
        </Routes>

      {/* <Home /> */}
    </div>
  )
}

export default App
