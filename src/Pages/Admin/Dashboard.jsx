import React from 'react'
import Button from '../../Components/Button'
import { useNavigate } from 'react-router-dom'
import user from '../../../src/assets/user3d.webp'
import book from '../../../src/assets/9316735.webp'
import donor from '../../../src/assets/5618442.webp'
import request from '../../../src/assets/7863860.webp'
import reporteduser from '../../../src/assets/4996978.webp'
import Statics from '../../../src/assets/4081003.webp'
const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div>

        <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[95%] m-auto p-2 gap-10 '>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/getallusers')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={user} alt="" />
           <div className='flex justify-center items-center'>
            <h1 className='text-2xl font-bold mt-3'>All Users</h1>
           </div>
          </div>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/getallbooks')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={book} alt="" />
           <div className='flex justify-center items-center mt-3'>
            <h1 className='text-2xl font-bold'>All Books</h1>
           </div>
          </div>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/getalldonor')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={donor} alt="" />
           <div className='flex justify-center items-center mt-3'>
            <h1 className='text-2xl font-bold'>All Donor</h1>
           </div>
          </div>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/Allrequest')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={request} alt="" />
           <div className='flex justify-center items-center mt-3'>
            <h1 className='text-2xl font-bold'>All Request</h1>
           </div>
          </div>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/Allreporteduser')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={reporteduser} alt="" />
           <div className='flex justify-center items-center mt-3'>
            <h1 className='text-2xl font-bold'>Reported User</h1>
           </div>
          </div>
          <div className='flex  flex-col justify-center items-center mt-10  rounded-md p-4 cursor-pointer hover:scale-105 transition-all duration-300  shadow' 
          onClick={() => navigate('/admin/statics')}  
          >
           <img className='w-48 h-48 shadow rounded-b-full' src={Statics} alt="" />
           <h1 className='text-2xl font-bold'>
            Statics
           </h1>
          </div>
        </div>

    </div>
  )
}

export default Dashboard