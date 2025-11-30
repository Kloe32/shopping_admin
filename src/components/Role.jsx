import React, { useState,useEffect } from 'react'
import { deleteRole, getRoles } from '../services/role.service';
import { roleColor } from '../config/config';
import { IoMdClose } from "react-icons/io";
import ConfirmationOverlay from './ConfirmationOverlay';
import { BsFillTrash3Fill } from 'react-icons/bs'
import { toast } from 'react-toastify';
import RoleModal from './RoleModal';

const Role = ({isOpen}) => {

    const [roles, setRoles] = useState([])
    const [roleToDelete, setRoleToDelete] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingRole,setEditingRole] =useState(null)

    const handleFetch = async () => {
        try {
            const response = await getRoles()  
            if (response.success) {
            setRoles(response.data)
      }          
        } catch (error) {
            console.log("Role Fetching Error:", error)
        }
    }

    const handleDeleteClick = (role) =>{
        setRoleToDelete(role)
    }

    const cancelDelete = () =>{
        setRoleToDelete(null)
    }
    
    const confirmDelete = () =>{
        if(roleToDelete){
            handleDeleteRole(roleToDelete._id)
            setRoleToDelete(null)
        }
    }

    const handleDeleteRole = async (id) =>{
        try {
            const response = await deleteRole(id)
            if(response.success){
                toast.warning(response.message)
                setRoles(roles.filter((r)=>r._id !== id))
            }
        } catch (error) {
            console.log(error)
            toast.error("There is something wrong while deleting.")
        }
    }

    useEffect(()=>{
        handleFetch()
    },[])




  return (
    <div className='flex flex-col w-full gap-4'>
        {
            roleToDelete && 
            <ConfirmationOverlay 
                title="Delete Role?"
                textHtml={
                <p>
                    Are you sure you want to delete this role{' '}
                    <span className="font-bold">"{roleToDelete?.name}"</span>? This
                    action cannot be undone.
                </p>
                }
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
                icon={<BsFillTrash3Fill className="h-6 w-6 text-red-600" />}
                btnText="Delete"
            />
        }
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
                    <div className={`text-xs rounded-full ${roleColor[role?.name]?roleColor[role?.name]:"bg-gray-400"} p-1 text-white font-semibold`}>
                        {role?.name}
                    </div>
                    <div className='flex gap-3 text-sm font-semibold'>
                        <button className='cursor-pointer active:opacity-65 text-blue-400 hover:opacity-50'
                            onClick={()=> {
                                setIsEditing(true)
                                setEditingRole(role)
                            }}
                        >
                            Edit
                        </button>
                        <button className='cursor-pointer active:opacity-65 text-red-400 hover:opacity-50' onClick={()=> handleDeleteClick(role)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))
        }
        {
            isEditing &&
            <RoleModal 
                isOpen={setIsEditing} 
                title={"Edit Role"}
                role={editingRole}
            />
        }
        <div className='py-3 border-t-1 border-gray-400 flex flex-col items-baseline'>
            Total Roles: {roles.length}
        </div>
    </div>
  )
}

export default Role