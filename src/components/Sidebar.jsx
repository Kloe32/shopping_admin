import React, { useState } from 'react'
import logo from '../assets/logoFull1.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { clearLocalStorage, getItemFromLocalStorage, storeItemToLocalStorage } from '../helper/helper'
import { FaUser, FaUserCog } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import {routes} from '../config/routes'
import { STORAGE_KEY } from '../config/config';
import ConfirmOverlay from './ConfirmOverlay';
import { GoSidebarExpand ,GoSidebarCollapse} from "react-icons/go";
import { useUser } from '../contexts/UserContext';
import { sideBarMenu } from '../config/sidebar.routes';

const Sidebar = () => {

    const {logout,userData,setuserData} =useUser()
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isCollaspe, setIsCollaspe] = useState(false)
    const allowedRoutes = userData?.allowedRoutes
    const allowedSideBars = sideBarMenu.filter((side) => allowedRoutes.includes(side.path))

    return (
    <aside className={`relative flex flex-col p-2 gap-3 bg-primary text-white min-h-screen  ${isCollaspe?'w-[5%]':' w-[18%]'}`}>
        <div className='flex justify-center items-center py-4'>
            <img src={logo} alt="" className='lg:w-[120px]' />
        </div>
        <div className='flex flex-col gap-3 justify-between text-xl h-full'>
            <div className={`flex flex-col gap-3 p-2`}>
                {
                    allowedSideBars.map((nav,i)=><NavLink key={i} to={nav.path} className={({isActive})=> `${isActive?"text-white bg-hover":"text-text-blur"} ${isCollaspe?'gap-4 justify-center items-center text-3xl':''}  rounded-md flex items-center gap-2  p-3`}>
                        {
                            nav.icon
                        }{
                            isCollaspe? '':nav.name 
                        }
                    </NavLink>)
                }
            </div>
            <div className='flex p-2 justify-center'>
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
    </aside>
  )
}

export default Sidebar