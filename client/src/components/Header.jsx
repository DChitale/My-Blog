import React from 'react'
import bg from './../assets/background.png'
import logo2 from './../assets/Logo2.png'
import {Github, CircleDashed,Twitter, Mail  } from 'lucide-react';

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>

      <div className='text-center mt-20 mb-8'>

        <div className='p-3 flex justify-center'>
              {/* Simple Circles */}
          <div className='border-2 p-2 rounded-full w-44 flex justify-around'>
                <CircleDashed  color='#ff5e56'/>
                <CircleDashed color='#febc2e'/>
                <CircleDashed color='#28c840'/>
          </div>
        </div>
        <div className='text-3xl mt-4'>
          <p>Hey 👋,<br/> Welcome to Dhananjay's Blog</p>
        </div>
      </div>
         {/* Social links */}
         <div className='flex w-full justify-center gap-6 cursor-pointer'>
             <Github size={50}  strokeWidth={1}/>
             <Twitter size={50} strokeWidth={1}/>
             <Mail size={50} strokeWidth={1}/>
         </div>
      <img src={bg} alt="background" className='absolute -top-50 -z-10 opacity-50' />
    </div>
  )
}

export default Header