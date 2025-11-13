import React from 'react'

const RoleModal = ({isOpen,title}) => {
  return (
    <div className="absolute w-full inset-0 flex items-center justify-center bg-black/40"
        onClick={(e)=>{
            e.stopPropagation
            isOpen(false)
        }}
    >
        <form className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 z-30'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <input type="text" placeholder='Name' className='p-2 border-1 border-slate-200 rounded-lg outline-1 outline-slate-400'/>
        </form>
    </div>
  )
}

export default RoleModal