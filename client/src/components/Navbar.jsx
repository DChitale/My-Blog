import React from 'react'
import logo from '../assets/Logo.jpg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <div onClick={()=>{navigate('/')}} className='cursor-pointer'><img src={logo} alt="logo" className='w-32 sm:w-44 ' /></div>
        
             <button onClick={()=>{navigate('/admin')}} className='bg-amber-300 cursor-pointer text-gray-800 rounded-full px-10 py-2.5'>Login</button>    
       
    </div>
  )
}

export default Navbar