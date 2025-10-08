import React from 'react'

const Navbar = () => {
  return (
    <nav className='container bg-violet-700 text-white flex justify-between max-w-[100%] p-4 md:w-full '>
      <div className=' items-center'>
        <span className='cursor-pointer hover:scale-110 text-xl'><span>work</span><span className='font-bold'>Todo</span></span>
      </div>
      <ul className='flex gap-8 items-center px-4'>
        <li className='cursor-pointer hover:scale-110 hover:underline'>Home</li>
        <li className='cursor-pointer hover:scale-110 hover:underline'>About us</li>
        <li className='cursor-pointer hover:scale-110 hover:underline'>Help</li>
        <li className='cursor-pointer hover:scale-110 hover:underline'>More</li>
      </ul>
    </nav>
  )
}

export default Navbar
