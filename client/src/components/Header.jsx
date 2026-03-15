import React from 'react'
import {Github, CircleDashed, Twitter, Mail} from 'lucide-react';

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative text-white mb-10'>

      <div className='text-center mt-20 mb-8'>
        <div className='p-3 flex justify-center'>
          <div className='border-2 p-2  w-44 flex justify-around'>
            <CircleDashed color='#ff5e56'/>
            <CircleDashed color='#febc2e'/>
            <CircleDashed color='#28c840'/>
          </div>
        </div>
        <div className='text-3xl mt-4'>
          <p>Hey 👋,<br/> Welcome to <span className='text-amber-300'>Dhananjay's</span> Blog.</p>
        </div>
      </div>

      {/* Social links */}
      <div className='flex w-full justify-center gap-6 cursor-pointer'>
        <a href='https://github.com/DChitale' target='_blank' rel='noreferrer'>
          <Github size={50} className='p-2 border-2 hover:bg-gray-300 hover:text-black' strokeWidth={1}/>
        </a>
        <a href='https://x.com/DChitale91431' target='_blank' rel='noreferrer'>
          <Twitter size={50} className='p-2 border-2 hover:bg-blue-200 hover:text-black' strokeWidth={1}/>
        </a>
        <a href='mailto:chitaledhananjay70@gmail.com'>
          <Mail size={50} className='p-2 border-2 hover:bg-red-200 hover:text-black' strokeWidth={1}/>
        </a>
      </div>

    </div>
  )
}

export default Header