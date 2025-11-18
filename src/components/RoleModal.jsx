import React, {useState} from 'react'
import { routes } from '../config/config'
const RoleModal = ({isOpen,title}) => {
  const [selectedRoute, setSelectedRoute] = useState([])
  return (
    <div className="absolute w-full inset-0 flex items-center justify-center bg-black/40"
        onClick={(e)=>{
            e.stopPropagation
            isOpen(false)
        }}
    >
        <form className='bg-white rounded-lg shadow-md p-8 flex flex-col gap-5 z-30'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <input type="text" placeholder='Name' className='p-2 border-1 border-slate-200 rounded-lg outline-1 outline-slate-400'/>
            <input type="text" placeholder='Description' className='p-2 border-1 border-slate-200 rounded-lg outline-1 outline-slate-400'/>
            <div className='grid grid-cols-2 gap-3'>
              {
                routes.map((route,index)=>{
                  return <div key={index} className='bg-slate-200 shadow-gray-400 shadow-md p-2 rounded-md cursor-pointer hotransition-all duration-300 transform hover:scale-105'>
                    {route.name}
                  </div>
                })
              }
            </div>
        </form>
    </div>
  )
}

export default RoleModal