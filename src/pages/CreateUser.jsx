import React, { useEffect,useState } from 'react'
import Sidebar from '../components/Sidebar'
import { getItemFromLocalStorage } from '../helper/helper'
import { fetchUsers } from '../services/user.service'


const CreateUser = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    handleFetch()
  },[])

  const handleFetch = async ()=>{
    try {
      const response = await fetchUsers()
      if(response.success){
        setUsers(response.data)
      }
    } catch (error) {
      
    }
  }
  
  useEffect(()=>{
    fetchUsers()
  },[])
  return (

    <div className='flex flex-col relative min-h-full'>
      <div className='w-full p-5 flex flex-col gap-2'>
        <div className='flex justify-end'>

        <button className='px-3 py-2 bg-primary rounded-md cursor-pointer text-white hover:opacity-60'>+ Add New User</button>
        </div>
        <table className='bg-slate-300 border-1 p-1 w-full'>
        <thead className='text-center h-15'>
          <tr className='border-1'>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center h-15'>
          {
            users.map((user)=>(
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='flex justify-center items-center'>
                  <div className='flex gap-3 items-center h-full'>
                    <button className='px-3 py-2 bg-primary rounded-md cursor-pointer text-white hover:opacity-80'>Edit</button>
                    <button className='px-3 py-2 bg-red-500 rounded-md cursor-pointer text-white hover:opacity-60'>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          }            
        </tbody>
        </table>
      </div>

      {/* <div className='absolute flex w-full h-full justify-center items-center bg-black/10 '>
          <form action="" className='flex flex-col bg-white p-6 rounded-md gap-3'>
            <h2 className='text-center text-2xl font-bold'>User Creation Form</h2>
            <div className='flex w-full justify-between items-center text-xl'>
              <label htmlFor="name">Name</label>
              <input type="text" className='border-1 rounded-md p-2'/>
              <label htmlFor="email">Email</label>
              <input type="email"className='border-1 rounded-md p-2' />              
            </div>
            <div className='flex w-full justify-between items-center text-xl'>
              <label htmlFor="password">Password</label>
              <input type="text" className='border-1 rounded-md p-2'/>
              <label htmlFor="role">Role</label>
              <select name="" id="" className='border-1 rounded-md p-2'>
                <option value="">--Please choose a role</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <label htmlFor="">Select Allow Routes</label>
            <input type="checkbox" />
          </form>
      </div> */}

    </div>
  )
}

export default CreateUser