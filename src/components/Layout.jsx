import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Nav from './Nav'
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="relative flex flex-col w-full">
        <Nav />
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
