import React, {useState,useEffect} from 'react'
import { routes } from '../config/config'
import { toast } from 'react-toastify';
import { addRole } from '../services/role.service';

const RoleModal = ({isOpen,title, role}) => {
  const [allowedRoutes, setAllowedRoutes] = useState([] || role?.allowedRoutes)
  const [name,setName]=useState("" || role?.name)
  const [description, setDescription] = useState(role?.description ||"")

  const handlePathSelection = (path) =>{
    if(allowedRoutes.includes(path)){
      setAllowedRoutes(allowedRoutes.filter((route) => route !== path))
    } else{
      setAllowedRoutes([...allowedRoutes,path])
    }
  }

  const clearInput = () =>{
    setAllowedRoutes([])
    setName("")
    setDescription(""),
    isOpen(false)
  }

  const handleCreateUpdateRole = async () => {
    if(!name || name.trim() === "" || allowedRoutes.length === 0){
      return toast.warn("Invalid Input")
    }
    try {
      const payload = {
        name, 
        description: description || "",
        allowedRoutes
      }

      if(role !== undefined){

      }

      const response = await addRole(payload)
      if(response.success){
        toast.success(`Role Created Successfully.`)
        clearInput()
      }
    } catch (error) {
      console.log("Error Creating or Updating Role",error)
    }
  }

  return (
    <div className="absolute w-full inset-0 flex items-center justify-center bg-black/40"
        onClick={(e)=>{
            isOpen(false)
        }}
    >
        <form className='relative bg-white rounded-lg shadow-md p-8 flex flex-col gap-5 z-30'
          onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
        >
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <input value={name}
            onChange={(e)=>setName(e.target.value)}
             type="text" placeholder='Name' className='p-2 border-2 border-slate-200 rounded-lg outline-1 outline-slate-400'/>
            <input value={description} 
            onChange={(e)=>setDescription(e.target.value)}
            type="text" placeholder='Description' className='p-2 border-2 border-slate-200 rounded-lg outline-1 outline-slate-400'/>
            <div className='grid grid-cols-2 gap-3'>
              {
                routes.map((route,index)=>{
                  return <div 
                    key={index} 
                    className={` ${allowedRoutes.includes(route.path) ? "bg-blue-300" : "bg-slate-200"} shadow-gray-400 shadow-md p-2 rounded-md cursor-pointer hotransition-all duration-300 transform hover:scale-105`}
                    onClick={()=>handlePathSelection(route?.path)}                    
                  >
                    {route.name}
                  </div>
                })
              }
            </div>
            <div className='flex justify-between items-center gap-4'>
              <button className='p-3 bg-gray-400 text-white shadow-md shadow-gray-300 rounded-md flex-1/3  hover:opacity-60 active:opacity-40 cursor-pointer'
              onClick={clearInput}
              >
                Cancel
              </button>
              <button className='p-3 bg-primary text-white shadow-md shadow-gray-300 rounded-md flex-2/3 hover:opacity-60 active:opacity-40 cursor-pointer'
              onClick={handleCreateUpdateRole}
              >
                Submit
              </button>
            </div>
        </form>
    </div>
  )
}

export default RoleModal