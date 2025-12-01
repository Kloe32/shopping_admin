import React, { useState } from 'react'
import logo from '../assets/logoFull1.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { SlLogout } from 'react-icons/sl'
import { useUser } from '../contexts/UserContext'
import { sideBarMenu } from '../config/sidebar.routes'
import ConfirmationOverlay from './ConfirmationOverlay'

const Sidebar = () => {
  const { logout, userData, setuserData } = useUser()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isCollaspe, setIsCollaspe] = useState(false)
  const allowedRoutes = userData?.role?.allowedRoutes
  const allowedSideBars = sideBarMenu.filter((side) =>
    allowedRoutes.includes(side.path)
  )

  return (
    <aside
      className={`relative flex flex-col p-2 gap-3 bg-primary text-white min-h-screen  ${isCollaspe ? 'w-[5%]' : ' w-[20%]'}`}
    >
      <div className="flex justify-center items-center py-4">
        <img src={logo} alt="" className="lg:w-[120px]" />
      </div>
      <div className="flex flex-col gap-3 justify-between text-xl h-full">
        <div className={`flex flex-col gap-3 p-2`}>
          {allowedSideBars.map((nav, i) => (
            <NavLink
              key={i}
              to={nav.path}
              className={({ isActive }) =>
                `${isActive ? 'text-white bg-hover' : 'text-text-blur'} ${isCollaspe ? 'gap-4 justify-center items-center text-3xl' : ''}  rounded-md flex items-center gap-2  p-3`
              }
            >
              {nav.icon}
              {isCollaspe ? '' : nav.name}
            </NavLink>
          ))}
        </div>
        <div className="flex p-2 justify-center">
          <button
            onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            className="flex gap-2 items-center cursor-pointer hover:text-white/60"
          >
            <SlLogout />
            Logout
          </button>
        </div>
      </div>
      {isOverlayOpen && (
        <ConfirmationOverlay
          title="Confirm Logout"
          textHtml={<p>Are you sure you want to Logout?</p>}
          onCancel={() => setIsOverlayOpen(!isOverlayOpen)}
          onConfirm={logout}
          icon={<SlLogout className="h-6 w-6 text-red-600" />}
          btnText="Logout"
        />
      )}
    </aside>
  )
}

export default Sidebar
