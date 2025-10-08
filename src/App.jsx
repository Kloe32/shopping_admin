import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getItemFromLocalStorage, storeItemToLocalStorage } from './helper/helper'
import { STORAGE_KEY } from './config/config'
import {routes, DEFAULT_ROUTES} from './config/routes'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { UserProvider, useUser } from './contexts/UserContext'
import { ToastContainer } from 'react-toastify'

function AppContent() {

  const {userData,setUserData} = useUser()
  const router = useMemo(()=>{
    const userAllowedRoutes =userData?.allowedRoutes || []
    const allowedRoutes = userData ? [...userAllowedRoutes,...DEFAULT_ROUTES] : ["/login"]
    const filteredRoutes = routes.map((route)=>{
      if(route.children){
        const allowedChildren = route.children.filter((child)=>allowedRoutes?.includes(child.path))
        if(allowedChildren?.length=== 0) return null
        return {
          ...route,
          children:allowedChildren
        }
      }

      return allowedRoutes?.includes(route.path) ? route: null
    }).filter(Boolean)

    filteredRoutes.push({
      path:"*",
      element: userData ? <Navigate to={filteredRoutes[0]?.children[0]?.path}/> : <Navigate to='/login' replace /> 
    })
    return createBrowserRouter(filteredRoutes)
  },[userData])

  return <RouterProvider router={router} />
}

const App = ()=> <UserProvider>
  <AppContent />
    <ToastContainer
    position='top-right'
    autoClose={3000}
    hideProgressBar ={false}
    closeOnClick={true}
    draggable
    pauseOnHover
    theme='dark'
  />
</UserProvider>

export default App
