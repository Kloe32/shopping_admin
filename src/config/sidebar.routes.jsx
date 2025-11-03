import Category from '../pages/Category'
import CreateUser from '../pages/CreateUser'
import Order from '../pages/Order'
import Product from '../pages/Product'
import Unit from '../pages/Unit'
import Login from '../pages/Login'
import Layout from '../components/Layout'
import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import { MdDashboard } from 'react-icons/md'
import { FaUserCog } from 'react-icons/fa'
import { AiFillProduct } from 'react-icons/ai'
import { MdCategory, MdCurrencyExchange, MdLogout } from 'react-icons/md'
import { IoIosPaper } from 'react-icons/io'
import { SlLogout } from 'react-icons/sl'
import { GoTag } from 'react-icons/go'

export const sideBarMenu = [
  {
    icon: <MdDashboard />,
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <FaUserCog />,
    name: 'Manage User',
    path: '/create-user',
  },
  {
    icon: <GoTag />,
    name: 'Manage Product',
    path: '/product',
  },
  {
    icon: <IoIosPaper />,
    name: 'Manage Order',
    path: '/order',
  },
  {
    icon: <MdCategory />,
    name: 'Manage Category',
    path: '/category',
  },
  {
    icon: <MdCurrencyExchange />,
    name: 'Manage Unit',
    path: '/unit',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'Settings',
    path: '/settings',
  },
]
