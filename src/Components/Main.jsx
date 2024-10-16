import React from 'react'
import { useState,useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Main() {
  const [nav, setNav] = useState(false);
  const [LGButton,SetLGButton]=useState('text-white mx-auto mt-9 hover:bg-[#00df9a] w-52 text-center rounded-md text-xl h-12  items-center py-2 transition-all ease-in-out duration-700 border border-white hover:border-[#00df9a] hover:text-black hover:font-bold blur')
  const [effectAnim,SetEffectAnim] = useState("text-[#00df9a] transition-all duration-1000 ease-in-out md:text-4xl font-bold text-center md:pt-[20%] shadow-green-500 drop-shadow-md blur-sm pt-[50%] text-3xl")
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Login' ,href:'/login'},
    { id: 2, text: 'Register',href:'/register' },

  ];

  setTimeout(() => {
    SetEffectAnim("text-[#00df9a] transition-all duration-1000 ease-in-out md:text-4xl font-bold text-center md:pt-[18%] shadow-green-500 drop-shadow-md pt-[40%] text-3xl")
  }, 5000);
  setTimeout(() => {
    SetLGButton('text-white mx-auto mt-9 hover:bg-[#00df9a] w-52 text-center rounded-md text-xl h-12  items-center py-2 transition-all ease-in-out duration-700 border border-white hover:border-[#00df9a] hover:text-black hover:font-bold ')
  }, 7000);
  return (
    <div className='transition-all duration-1000 ease-in-out scroll-smooth '>
            {/* navbar  start */}
            <div className='bg-black flex transition-all duration-1000 justify-between items-center h-24  mx-auto px-4 text-white'>
      {/* Logo */} 
      <h1 className='w-full text-3xl font-bold text-[#00df9a] md:ml-20 ml-3 transition-all duration-1000'>How Many <span className='animate-pulse'>?</span></h1>

      {localStorage.getItem('username')?(<Link to={'/dashboard'} className='p-4 transition-all duration-1000 ease-in-out hidden md:flex hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer  hover:text-black'>Dashboard</Link>):(
    <>
    {/* Desktop Navigation */}
    <ul className='hidden md:flex'>
    {navItems.map(item => (
      <Link to={item.href}>
      <li
        key={item.id}
        className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
      >
        {item.text}
      </li>
      </Link>
    ))}
    </ul>
    </>
      )}
      

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden transition-all duration-1000 '>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300]  ease-in-out  transition-all duration-1000'
            : 'ease-in-out w-[60%]  fixed top-0 bottom-0 left-[-100%] transition-all duration-1000'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>How Many ?</h1>

        {/* Mobile Navigation Items */}
        
    {localStorage.getItem('username')?(<Link to={'/dashboard'}  className='p-4 border-b transition-all duration-1000 ease-in-out rounded-xl hover:bg-[#00df9a] w-full hover:text-black cursor-pointer border-gray-600'>Dashboard</Link>):(
    <>
    {/* Desktop Navigation */}
    <ul className='block space-y-6 md:hidden'>
    {navItems.map(item => (
      <Link to={item.href}>
      <li
        key={item.id}
        className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
      >
        {item.text}
      </li>
      </Link>
    ))}
    </ul>
    </>
      )}
      </ul>
    </div>


            {/* navbar end  */}

          {/* main section start */}
            <div className='scroll-smooth bg-black h-screen w-full  '>
                                <h1 className={effectAnim} >
                                                              <Typewriter options={{loop:true}}
                                                                onInit={(typewriter) => {
                                                                  typewriter.typeString('How many words can your memory hold? ')
                                                                    .pauseFor(3500)
                                                                    .deleteAll()
                                                                    typewriter.typeString(' Transform Your Memory, Transform Your Life !')
                                                                    .pauseFor(3500)
                                                                    .start();}}
                                                              />
                                </h1>

                                  <Link to={'/login'} >
                                                              <div className={LGButton}>
                                                               <span>Let's Go <svg className='w-9 h-9 inline ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path className='hover:text-black text-white' style={{fill:"white"}} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"  data-name="Right"/></svg></span> 
                                                              </div>
                                  </Link>
            </div>
          {/* main section end */}
 
 
    </div>
  )
}
