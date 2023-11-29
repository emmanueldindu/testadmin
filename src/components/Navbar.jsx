import React, {useEffect, useState} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RiNotification3Line } from 'react-icons/ri'


// import UserProfile from '.'
import {  UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'





const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
    
    <span style={{ background: dotColor}} className='absolute inline-flex rounded-full h-5 w-5 right-2 top-2'>

{icon}
    </span>
    </button>

)

const Navbar = () => {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState(null)
  useEffect(() => {
    axios.get('https://globalpay-merchant.onrender.com/api/dashboard/user-details', {
      headers: {
        Authorization:  `Bearer ${token}`,
      },
    })
      .then((response) => {
          console.log(response.data.data)

        if (response.data.data) {
          setUser(response.data.data)
        } else {
          console.log('api error')
          }
      })
      .catch((err) => {
        console.log(err)
        
})
  }, [token])


    

  const { activeMenu, setActiveMenu, isClicked, setIsClicked, screenSize, setScreenSize, handleClick } = useStateContext()
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize()

    return() => window.removeEventListener('resize', handleResize)
  }, []);


  useEffect(() => {
    if (screenSize <= 900) {
  setActiveMenu(false)
    } else {
      setActiveMenu(true)
      
}
  

}, [screenSize])
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
     
      <NavButton title='menu' customFunc={() => setActiveMenu((prevActiveMenu ) => !prevActiveMenu) } color="grey" icon={<AiOutlineMenu />}/>
   
   
      <div className="flex">

      <NavButton
          title="notification"
          customFunc={() => handleClick('notification')}
          color='gray'
          icon={<RiNotification3Line />}
        
      />

        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg "
         data-tip="Profile" // Text for the tooltip
         data-for="profileTooltip" // Unique ID for the tooltip 
        onClick={() => handleClick('userProfile')}
        >

          {/* <img className='rounded-full w-8 ' src={avatar} 

          /> */}
          <p className='dark:text-gray-200'>
            <span className='text-12'>Hi,</span>
            {user && (
              <span className='font-semibold text-12'>{user.name.split(' ')[0]} </span>
          
        )}  </p>
        </div>
        {isClicked.userProfile && <UserProfile />}
   </div>
    </div>
  )
}

export default Navbar
