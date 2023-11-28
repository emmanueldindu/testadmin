import logo from './logo.svg';
import './App.css';
import './index.css'
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router, Link, Outlet } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useStateContext } from './contexts/ContextProvider';
import { Navbar, Footer, Sidebar, Theme } from './components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Ecommerce, Orders, Calender, Employee, Stacked, Pyramid,  Customer, Kanban, Area,  Financial, ColorPicker, Editor, Password } from './pages';
// const [sidebar, setSidebar] = useState(true)
import { registerLicense } from '@syncfusion/ej2-base';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import { useEffect } from 'react';



function Home() {
  
  const logged = localStorage.getItem('token')
  const {activeMenu, themeSettings, setThemeSettings, currentMode} = useStateContext()

  useEffect(() => {
    if (logged) {
      setTimeout(() => {
        localStorage.removeItem('token')
      }, 2 * 60 * 60 * 1000)
    }
  }, [])

  return (
    <>
    {
        
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
      <div className="flex relative dark:bg-main-dark-bg" >
        <div className="fixed right-4 bottom-4 " style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position='Top'
          >
            <button
              type='button'
              onClick={() => setThemeSettings(true)}
              className='text-3xl rounded-2xl text-white bg-gray-400 p-3 hover:drop-shadow-2xl hover:bg-light-gray hover:text-gray-400'
            > 

              {/* <FiSettings /> */}
              {currentMode === 'Dark' ? <FaSun /> : <FaMoon />}
            </button>
            
          </TooltipComponent>

        </div>
      
      {activeMenu ? (
        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>

          <Sidebar />
           </div>
      ): (
        <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
      )}
     <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >

        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">

      <Navbar />
        </div>
          {themeSettings && <Theme />}
       
          {/* Dashboard */}
          {/* <Route path='/' element={<Login />} /> */}
         
          <Outlet/>

          {/* apps */}
         

          {/* charts */}

          {/* <Route path='/line' element={<Line /> } /> */}
        
          {/* <Route path='/bar' element={} /> */}
          {/* <Route path='/pie' element={<Pie />} /> */}
        
    
        </div>
  </div>
    {/* </BrowserRouter> */}
</div>
        }
        {
          !logged && <Navigate to='/login'/>
      }
    </>
    
      );
}

export default Home;
