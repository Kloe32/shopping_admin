import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { clearLocalStorage, getItemFromLocalStorage, storeItemToLocalStorage } from '../helper/helper'
import { FaUser, FaUserCog } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import {routes} from '../config/routes'
import { STORAGE_KEY } from '../config/config';
import ConfirmOverlay from './ConfirmOverlay';
import { GoSidebarExpand ,GoSidebarCollapse} from "react-icons/go";
import { useUser } from '../contexts/UserContext';

const Sidebar = () => {

    const {logout,userData,setuserData} =useUser()
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isCollaspe, setIsCollaspe] = useState(false)
    const allowedRoutes = userData?.allowedRoutes
    const mainChildren = routes.find(route => Array.isArray(route.children) && route.children.length > 0)
    const navigation = mainChildren.children.filter((child)=>allowedRoutes.includes(child.path))

    return (
    <div className={`relative flex flex-col p-2 h-screen gap-3 bg-background text-white  ${isCollaspe?'w-[5%]':' w-[18%]'}`}>

        <div className={`flex  border-b-1 ${isCollaspe?'justify-center':'justify-between'}`}>
            <div className={` ${isCollaspe ? 'hidden' :'flex'} gap-4 items-center p-3 `}>
                <div className='text-3xl border-2 border-white rounded-full p-3'>
                    <FaUser />
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-white/80'>{userData.role}</p>
                    <p className='uppercase'>{userData.name}</p>
                </div>
            </div>
            <div className={`p-3  flex  ${isCollaspe?'text-3xl':'justify-center text-2xl'}`}>
                    <button onClick={()=>setIsCollaspe(!isCollaspe)} className='cursor-pointer hover:bg-text-blur p-2 rounded-md'>
                        {
                            isCollaspe
                            ?
                            <GoSidebarCollapse />
                            :
                            <GoSidebarExpand />                    
                        }
                    </button>
            </div>
        </div>        
        <div className='flex flex-col gap-3 justify-between text-xl h-full'>
            <div className={`flex flex-col gap-3 p-1`}>
                {
                    navigation.map((nav,i)=><NavLink key={i} to={nav.path} className={({isActive})=> `${isActive?"text-white bg-[#17212c]":"text-text-blur"} ${isCollaspe?'gap-4 justify-center items-center text-3xl':''} flex items-center gap-2  p-2`}>
                        {
                            nav.icon
                        }{
                            isCollaspe? '':nav.name 
                        }
                    </NavLink>)
                }
            </div>
            <div>
                <button onClick={()=>setIsOverlayOpen(!isOverlayOpen)} className='flex gap-2 items-center cursor-pointer hover:text-white/60'><SlLogout />Logout</button>
            </div>
            <ConfirmOverlay 
            isOpen={isOverlayOpen} 
            title="Confirm Logout" 
            message="Are you sure you want to Logout?"
            onCancel={()=>setIsOverlayOpen(!isOverlayOpen)}
            onConfirm={logout}
            />
        </div>      
    </div>
  )
}

export default Sidebar