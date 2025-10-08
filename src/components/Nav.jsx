import React,{useEffect, useReducer, useState} from 'react'
import { useUser } from '../contexts/UserContext'
import { useLocation, Link } from 'react-router-dom'
import { sideBarMenu } from '../config/sidebar.routes'
import ConfirmOverlay from './ConfirmOverlay'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const {userData,logout} = useUser()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        setIsProfileOpen(false)
    },[location.pathname])
    
    const menuName = sideBarMenu?.filter((side)=>location.pathname===side.path)[0]?.name


return (
    <div className='flex h-15 px-3 shadow-gray-500 shadow-xs w-full items-center justify-between'>
        <h3 className='text-2xl font-bold'>{menuName}</h3>
        <div className='flex items-center gap-3'>
            <div>
                {userData?.name}
            </div>
            
            <div className='relative'>
                <button className='hover:cursor-pointer hover:border-1 rounded-full' onClick={()=>setIsProfileOpen(!isProfileOpen)}>
                    <img src={userData.imageUrl? userData.imageUrl:"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"} alt="" className='w-10 h-10 rounded-full'/>   
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 transform origin-top-right transition-all duration-200 scale-95 ${isProfileOpen?"scale-100 opacity-100":"opacity-0 pointer-events-none"}`}>
                    <Link to={'profile'} onClick={()=>setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-t-lg" >View Profile</Link>
                    <Link to={'settings'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Settings</Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        Customize Profile
                    </a>    
                    <div className="border-t border-gray-100 my-1"></div>
                    <div className='w-full hover:bg-gray-100 hover:cursor-pointer'>
                        <button onClick={()=>setIsOverlayOpen(!isOverlayOpen)} className='w-full text-left px-4 py-2 text-sm text-red-500 transition-colors rounded-b-lg hover:cursor-pointer'>Logout</button>
                    </div>

                </div>
            </div>
        </div>
                            <ConfirmOverlay 
                    isOpen={isOverlayOpen} 
                    title="Confirm Logout" 
                    message="Are you sure you want to Logout?"
                    onCancel={()=>setIsOverlayOpen(!isOverlayOpen)}
                    onConfirm={logout}
                    />
    </div>
)
}

export default Nav