import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { getItemFromLocalStorage } from '../helper/helper'
import { fetchUsers } from '../services/user.service'
import { FaSearch } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'

const CreateUser = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
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
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="relative max-w-md mb-8">
        <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    {user.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'Admin'
                        ? 'bg-blue-100 text-blue-600'
                        : user.role === 'Editor'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Action Buttons */}
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
  )
}

export default CreateUser
