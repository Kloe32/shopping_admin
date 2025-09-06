import React, { useState,useEffect } from 'react'
import logo from '../assets/img/logo.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import { storeItemToLocalStorage } from '../helper/helper'
import { API_ROUTES, STORAGE_KEY } from '../config/config'
import axiosInstance from '../config/axiosInstance'
import { useUser,UserProvider } from '../contexts/userContext'


const Login = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isShowPassword,setisShowPassword] = useState(false)
    const [isRemember,setisRemember] =useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {setuserData} = useUser()
    const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const navigate  =useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            if(email.trim()===''){
                alert('Please Enter Your Email')
                return
            }else if(!emailRegX.test(email)){
                alert('Please Enter Correct Email.')
                return
            }else if(password.trim()===''){
                alert("Please Enter Your Password")
                return
            }
            const response = await axiosInstance.post(API_ROUTES.LOGIN_URL,{
              email,password
            })
            console.log(response)
            if(response.data.success){
              setuserData(response.data.data)
              storeItemToLocalStorage(STORAGE_KEY.USER_DATA,response.data.data)
              storeItemToLocalStorage(STORAGE_KEY.TOKEN,response.data.token)
            }            
        }catch(error){
            console.log("Error:",error.response.data)
            toast.error(error.response.data.message)
        }
    }
    
    return (
        <>
            <div className={`h-screen w-screen bg-[url('https://wallpapers.com/images/hd/cubed-squares-black-3d-bqeujlzpj3p2e505.jpg')] bg-cover text-white flex justify-center items-center font-roboto`}>
                <div className='flex flex-col gap-5 bg-slate-200/20 lg:py-[30px] lg:px-[70px] p-[20px] md:p-[40px] shadow-xl shadow-white/10 rounded-lg backdrop-blur-xs border-2 border-white/20' >
                    <div className='flex justify-center items-center'>
                        <img src={logo} alt="" className='w-[200px]'/>
                    </div>
                    <h2 className='text-2xl font-bold'>Login</h2>
                    <form action="" className='flex flex-col gap-4' onSubmit={(e)=>{handleSubmit(e)}}>   

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className=''>Email</label>
                            <input required value={email} id='email' type="email" className='bg-white p-2 rounded-md outline-0 text-black' onChange={(e)=>setemail(e.target.value)}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className=''>Password</label>
                            <div className='bg-white p-2 rounded-md flex justify-between items-center'>
                            <input required type={isShowPassword?'text':'password'} value={password} id='password' className='outline-0 text-black' onChange={(e)=>setpassword(e.target.value)}/>
                            <FontAwesomeIcon icon={isShowPassword?faEye :faEyeSlash}  className={`text-black cursor-pointer active:opacity-65`} onClick={()=>setisShowPassword(!isShowPassword)}/>
                            </div>
                        </div>
                        <div className='flex gap-[30px] items-center'>
                            <div className='flex gap-2 items-center text-sm'>
                                <div className={`w-[40px] h-[20px] cursor-pointer transition-all duration-500 ${isRemember?"bg-black":"bg-white "}  rounded-full relative flex items-center px-[3px]`} onClick={()=>setisRemember(!isRemember)}>
                                    <div className={`w-[15px] h-[15px] transition-all duration-500 rounded-full absolute ${isRemember?'left-5 bg-white' :'left-1 bg-black'} `}></div>
                                </div>
                                Remember Me
                            </div>
                            <div className='flex gap-2 text-sm hover:underline cursor-pointer'>
                                Forget Password?
                            </div>
                        </div>
                        <button className='relative bg-gray-800 p-2 rounded-md cursor-pointer hover:opacity-75 active:opacity-80' > Login
                        </button>
                    </form>
                </div>
            </div>   
        </>
    )
}

export default Login
