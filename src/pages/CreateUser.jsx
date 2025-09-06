import React, { useEffect,useState } from 'react'
import Sidebar from '../components/Sidebar'
import { getItemFromLocalStorage } from '../helper/helper'
import { STORAGE_KEY } from '../config/config'
import axios from 'axios'


const CreateUser = () => {
  const [users, setUsers] = useState([])
  const fetchUsers = async () =>{
    try {
      const token = getItemFromLocalStorage(STORAGE_KEY.TOKEN)

      
      const response = await axios.get('http://localhost:8080/api/v1/user',{
        headers: {
          'x-access-token':`${token}`
        }}
      )
      console.log(response.data.users)
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUsers()
  },[])
  console.log(users)
  return (

    <div>
      <h2 className='text-3xl font-bold'>Manage User</h2>
      {
        users.map((user)=>{
          return <ul key={user._id} className='border-b-2 mb-6 p-2 flex gap-3 flex-col'>
            <li>Name:{user.name}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
          </ul>
        })
      }
    </div>
  )
}

export default CreateUser