import React from 'react'

const footer = () => {
  return (
    <div className=' bg-slate-800  text-white  flex flex-col justify-center items-center w-full   '>
        
      <div className='  logo text-2xl font-bold '>
      <span className='text-green-500'>&lt;</span>
                <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </div>
        <span className=' flex text-xl justify-center items-center gap-1 '> Created with
            <img  className=' w-6 ' src="/heart-icon.png" alt="heart" srcSet="" />
           By Riya</span>
    </div>
  )
}

export default footer
