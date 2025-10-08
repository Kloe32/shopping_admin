import React, { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import axiosInstance from "../config/axiosInstance"
import { toast } from 'react-toastify'
import {API_ROUTES,STORAGE_KEY} from "../config/config"
import { storeItemToLocalStorage } from '../helper/helper'
import loading from "../assets/loading.gif"
const Profile = () => {
    const {userData} = useUser()
    const [previewUrl, setPreviewUrl] = useState(userData?.imageUrl || "")
    const [name, setName] = useState(userData?.name || "")
    const [email, setEmail] = useState(userData?.email || "")
    const [isEditing, setIsEditing] = useState(false)
    const [file,setFile] =useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const onChangeImage =(file)=>{
        if(!file) return

        const url = URL.createObjectURL(file)
        console.log(url)
        setPreviewUrl(url)
        setFile(file)        
    }

    const triggerFileOpen = ()=>document.getElementById('image').click()

    const onSubmit = async (e)=>{
        setIsLoading(true)
        e.preventDefault()
        if (name.trim() === "") {
            toast.error("Name is required")
            return
        }
        if (email.trim() === "") {
            toast.error("Email is required")
            return
        }
        const formData = new FormData()
        if (file) formData.append("file", file)
        formData.append("name", name.trim())
        formData.append("email", email.trim())
        try {
            const response = await axiosInstance.put(`${API_ROUTES.UPDATE_URL}/${userData._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            if(!response) return

            toast.success("Profile updated")
            storeItemToLocalStorage(STORAGE_KEY.USER_DATA,response?.data?.data)
            window.location.reload()           
        } catch (error) {
            console.log("error",error)
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className='flex min-h-full justify-center items-center'>
            <div className={`flex p-5 shadow-gray-400 shadow-lg rounded-lg flex-col gap-4 w-[400px]`}>
                <div className={`${isEditing?"hidden":"flex"} gap-3 flex-col`}>

                    <div className='flex justify-center'>
                        <img src={userData.imageUrl} alt="" className='w-25 h-25 rounded-full'/>
                    </div>
                    <div className='flex items-center flex-col gap-3'>
                        <p className='text-2xl font-bold'>{userData.name}</p>
                        <p>{userData.role}</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button className='p-3 bg-primary text-white rounded-lg hover:cursor-pointer hover:opacity-60' onClick={()=>setIsEditing(true)}>Edit Profile</button>
                    </div>
                </div>
                <form className={`flex-col gap-3 items-center ${isEditing?"flex":"hidden"}`}>
                    <h2 className='text-2xl font-semibold'>Edit Profile</h2>
                    <div className='w-fit flex flex-col gap-4'>
                        <div className='flex gap-15 items-center'>
                            <div className='bg-slate-300 p-1 rounded-full'>
                                <img src={previewUrl} alt="" className='w-22 h-22 rounded-full'/>
                            </div>
                            <div className='bg-primary px-5 py-2 transition-colors duration-200 rounded-md text-white hover:cursor-pointer hover:opacity-70 active:bg-white' onClick={triggerFileOpen}>
                                Upload Photo
                            </div>
                        </div>
                        <input type="file" multiple={false} accept='image/*' name="image" id="image" className='hidden' onChange={(e)=>onChangeImage(e.target.files[0])}/>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="name" className='text-xl'>Name:</label>
                            <input value={name} type="text" className='border-1 border-gray-300 outline-0 p-2 rounded-md' onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="email" className='text-xl'>Email:</label>
                            <input value={email} type="text" className='border-1 border-gray-300 outline-0 p-2 rounded-md' onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className='flex mt-4 justify-end gap-4'>
                            <div className='bg-red-500 px-5 py-2 transition-colors duration-200 rounded-md text-white hover:cursor-pointer hover:opacity-70 active:bg-white'
                            onClick={()=>setIsEditing(false)}
                            >
                                Cancel
                            </div>
                            <button className='bg-primary px-5 py-2 transition-colors duration-200 rounded-md text-white hover:cursor-pointer hover:opacity-70 active:bg-white'
                            onClick={(e)=>onSubmit(e)}
                            >
                                {
                                    isLoading?
                                    <img src={loading} className='w-6'/>
                                    :
                                    'Save Changes'
                                }
                                </button>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Profile