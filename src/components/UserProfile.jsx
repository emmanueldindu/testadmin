import React, { useEffect, useState } from 'react'
import Button from './Button'
import { MdOutlineCancel } from 'react-icons/md'

import { userProfileData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../assets/slogo.png'
import axios from 'axios';
import { FaEnvelope, FaPhone, FaWallet } from 'react-icons/fa';

// import { MdOutlineCancel } from 'react-icons/md';
function UserProfile() {

  
  const { setIsClicked, initialState } = useStateContext()
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')
  useEffect(() => {
    axios.get('https://3.21.139.203/merchant/api/dashboard/user-details', {
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
  return (
  <div>
    {user && (
    <div className='nav-items z-10 bg-white absolute right-1 top-16 dark:bg-[#42464D] p-8 rounded-lg w-92 lg:w-94'>

      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
       

        <button
          className='text-gray-400 text-2xl rounded-[50%]'
        onClick={() => setIsClicked(initialState)}
        >
          <MdOutlineCancel />
          
        </button>
        
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          src={avatar}
          className='rounded-full h-12 w-12'
          alt='user-profile'
          
        
        
        />
        <div className='gap-5  p-2'>
              <p className="font-semibold text-xl dark:text-gray-200">{user.name}</p>
          {/* <p className="text-gray-600 font-medium text-sm dark:text-gray-400">  michelaina65@gmail.com</p>
          <p className="text-gray-600 text-sm font-medium dark:text-gray-400">09100491873</p>
          <p className="text-gray-600 text-sm font-medium dark:text-gray-400">6363577123</p> */}

        </div>

      </div>
      <div>
      
          <div  className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
            <button
            type='button'
              style={{ color: '#03c9d7', backgroundColor: '#e5fafb' }}
              className='text-xl rounded-lg p-3 hover:bg-light-gray'
              >
                <FaEnvelope />
              </button>
            <div>
              <p className='font-semibold dark:text-gray-200'>email</p>
              <p className="text-gray-500 text-sm dark:text-gray-300">{user.email} </p>
            
            </div>
          </div>
          

          <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
            <button
            type='button'
              style={{ color:'rgb(0, 194, 146)' , backgroundColor: 'rgb(235, 250, 242)' }}
              className='text-xl rounded-lg p-3 hover:bg-light-gray'
              >
                <FaPhone />
              </button>
            <div>
              <p className='font-semibold dark:text-gray-200'>Phone</p>
              <p className="text-gray-500 text-sm dark:text-gray-300">{user.phone} </p>
            
            </div>
          </div>


            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
            <button
            type='button'
              style={{ color: 'rgb(255, 244, 229)', backgroundColor: 'rgb(254, 201, 15)' }}
              className='text-xl rounded-lg p-3 hover:bg-light-gray'
            ><FaWallet /> </button>
            <div>
              <p className='font-semibold dark:text-gray-200'>Wallet Address</p>
              <p className="text-gray-500 text-sm dark:text-gray-300">{user.walletid} </p>
            
            </div>
          </div>
        
      </div>
      <div className="mt-5">
        <Button color="white" bgColor="rgb(135, 206, 235)" text="Logout" log='bg-blue-400' borderRadius="10px" width='full'  />
      </div>
      
      </div>
    ) }
      </div>
  )
}

export default UserProfile