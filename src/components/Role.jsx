import React, { useState,useEffect } from 'react'
import { getRoles } from '../services/role.service';
import { roleColor } from '../config/config';
import { IoMdClose } from "react-icons/io";

const Role = ({isOpen}) => {

    const [roles, setRoles] = useState([])

    

    const handleFetch = async () => {
        try {
            const response = await getRoles()  
            console.log(response)
            if (response.success) {
            setRoles(response.data)
      }          
        } catch (error) {
            console.log("Role Fetching Error:", error)
        }
    }

    useEffect(()=>{
        handleFetch()
    },[])




  return (
    <div className='flex flex-col w-full gap-4'>
        <div className='flex justify-between items-center'>
            <p className='text-xl font-semibold'>Available Roles</p>
            <IoMdClose 
            size={20}
            onClick={()=>isOpen(false)}
            className='cursor-pointer hover:bg-gray-200 rounded-sm'
            />
        </div>
        {
            roles.map((role,i)=>(
                <div
                    key={i}
                    className='flex justify-between items-center w-full px-2 py-4 bg-slate-100 rounded-lg border-1 border-gray-200'
                >
                    <div className={`text-xs rounded-full ${roleColor[role?.name]} p-1 text-white font-semibold`}>
                        {role?.name}
                    </div>
                    <div className='flex gap-3 text-sm font-semibold'>
                        <button className='cursor-pointer active:opacity-65 text-blue-400 hover:opacity-50'>
                            Edit
                        </button>
                        <button className='cursor-pointer active:opacity-65 text-red-400 hover:opacity-50'>
                            Delete
                        </button>
                    </div>
                </div>
            ))
        }
        <div className='py-3 border-t-1 border-gray-400 flex flex-col items-baseline'>
            Total Roles: {roles.length}
        </div>
    </div>
  )
}

export default Role