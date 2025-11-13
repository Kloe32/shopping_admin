import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import RoleModal from '../components/RoleModal'
import { getItemFromLocalStorage } from '../helper/helper'
import { fetchUsers } from '../services/user.service'
import { FaSearch } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { FaUpload } from "react-icons/fa6";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiUserSettingsLine, RiListCheck2 } from "react-icons/ri";
import Role from '../components/Role'

const CreateUser = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [editingUser,seteditingUser] = useState(null)
  const [isAddingRole, setIsAddingRole] = useState(false)
  const [showForm,setShowForm]= useState(false)
  const [isRoleBarOpen, setIsRoleBarOpen] = useState(false)
  useEffect(() => {
    handleFetch()
  }, [])

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )


  const handleFetch = async () => {
    try {
      const response = await fetchUsers()
      if (response.success) {
        setUsers(response.data)
      }
    } catch (error) {
      console.log('Error Fetching Users.', error)
    }
  }

  const handleSubmit = async () =>{

  }
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="relative min-w-full mb-8 flex justify-between">
        <div>
          <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex gap-5 items-center'>
          <div 
          onClick={() => setIsRoleBarOpen(true)} 
          className={`bg-primary flex gap-3 items-center rounded-md p-2 text-white cursor-pointer active:opacity-70 transition-all duration-300 transform hover:scale-105 font-semibold ${isRoleBarOpen ? "pointer-events-none opacity-25" : ""}`}
          disabled={isRoleBarOpen}
          >
            <RiListCheck2 size={20}/> View Roles
          </div>
          <div onClick={()=>setIsAddingRole(true)} className='bg-primary flex gap-3 items-center rounded-md p-2 text-white cursor-pointer active:opacity-70transition-all duration-300 transform hover:scale-105 font-semibold'>
            <RiUserSettingsLine size={20}/> Add New Role
          </div>
          <div onClick={()=>setShowForm(true)} className='bg-primary flex gap-3 items-center rounded-md p-2 text-white cursor-pointer active:opacity-70transition-all duration-300 transform hover:scale-105 font-semibold'>
            <AiOutlineUsergroupAdd size={20}/> Add New User
          </div>
        </div>
      </div>
      <div className='flex gap-6 items-start'>
        <div className='flex-1'>
          <div className={`grid gap-6 sm:grid-cols-2 ${isRoleBarOpen ? "grid-cols-2":"lg:grid-cols-3"}`}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className='w-15 h-15 rounded-full'>
                        <img src={user.imageUrl || "https://rztmbwyachdqkzksjcsu.supabase.co/storage/v1/object/public/user-profile/placeholder.jpg" } alt="User Profile" className='object-fill bg-cover w-full rounded-full'/>
                      </div>
                      <h2 className="text-lg font-medium text-gray-800">
                        {user.name}
                      </h2>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                          user?.role?.name === 'Guest'
                            ? 'bg-green-500 text-white'
                            : user?.role?.name === 'Admin'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {user?.role?.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Email: {user?.email}</p>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                      <MdModeEdit size={18} />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                      <IoTrashOutline size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                key={'no-user'}
                className="text-gray-500 text-center col-span-full py-12"
              >
                No users found.
              </div>
            )}

          </div>
        </div>
        <div className={`w-80 p-4 bg-white rounded-lg shadow ${isRoleBarOpen ? "flex": "hidden"}`}>
            <Role isOpen={setIsRoleBarOpen}/>
        </div>
      </div>
        {showForm && 
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-lg p-6 relative">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={"https://placehold.co/100"}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                    <FaUpload size={16} /> Upload Photo
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {editingUser ? "Save Changes" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
        {
          isAddingRole &&
          <RoleModal 
            isOpen={setIsAddingRole}
            title="Add New Role"
           />
        }
    </div>
  )
}

export default CreateUser
