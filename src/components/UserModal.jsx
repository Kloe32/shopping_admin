import React from 'react'
import { FaUpload } from "react-icons/fa6";

const UserModal = ({editingUser}) => {
  return (
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
  )
}

export default UserModal