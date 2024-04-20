import React from 'react'

const Navbar = () => {
  return (
    <>
   <div>
    <nav className=' bg-slate-800  text-white'>
        <div className='mycontainer flex justify-between items-center h-12 px-10 py-5'>

        <div className='logo text-xl font-bold'>
        <span className='text-green-500'>&lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul className=' flex gap-4 '>
            <a href=""><li  className=' hover:font-bold'>Home</li></a>
            <a href=""> <li className=' hover:font-bold'>About</li></a>
            <a href=""><li className=' hover:font-bold'>Contact</li></a>
        </ul> */}
       <button className='flex items-center justify-between bg-green-700 px-3 gap-2 rounded-full font-bold ring-1 ring-white '>
            <img className='invert w-9 ' src="/github-icon.png" alt="github" />
            Github</button>
        </div>
    
    </nav>
</div>
    
    </>
  )
}

export default Navbar
