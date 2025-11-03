import Category from '../pages/Category'
import CreateUser from '../pages/CreateUser'
import Order from '../pages/Order'
import Product from '../pages/Product'
import Unit from '../pages/Unit'
import Login from '../pages/Login'
import Layout from '../components/Layout'
import { Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

export const DEFAULT_ROUTES = ['/profile', '/settings']

export const routes = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
  },
  {
    name: 'Main',
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        name: 'Manage User',
        path: '/create-user',
        element: <CreateUser />,
      },
      {
        name: 'Manage Product',
        path: '/product',
        element: <Product />,
      },
      {
        name: 'Manage Order',
        path: '/order',
        element: <Order />,
      },
      {
        name: 'Manage Category',
        path: '/category',
        element: <Category />,
      },
      {
        name: 'Manage Unit',
        path: '/unit',
        element: <Unit />,
      },
      {
        name: 'Profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        name: 'Settings',
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    name: '404 Page',
    path: '/*',
    element: <Layout />,
  },
]
