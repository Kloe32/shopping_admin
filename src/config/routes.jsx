import Category from "../pages/Category";
import CreateUser from "../pages/CreateUser";
import Order from "../pages/Order";
import Product from "../pages/Product";
import Unit from "../pages/Unit";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { MdDashboard } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory,MdCurrencyExchange, MdLogout } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { GoTag } from "react-icons/go";

export const routes = [
    {
        name: "Login",
        path: "/login",
        element:<Login />
    },
    {
        name:"Main",
        path:"/",
        element:<Layout />,
        children:[
            {
                index:true,
                element:<Navigate to="/dashboard" />
            },
            {
                icon: <MdDashboard/>,
                name:"Dashboard",
                path:"/dashboard",
                element:<Dashboard />
            },
            {   
                icon:<FaUserCog />,
                name:"Manage User",
                path:"/create-user",
                element:<CreateUser />
            },
            {
                icon:<GoTag />,
                name:"Manage Product",
                path:"/product",
                element:<Product />
            },
            {
                icon:<IoIosPaper />,
                name:"Manage Order",
                path:"/order",
                element:<Order />
            },
            {
                icon:<MdCategory />,
                name:"Manage Category",
                path:"/category",
                element:<Category />
            },
            {
                icon:<MdCurrencyExchange />,
                name:"Manage Unit",
                path:"/unit",
                element:<Unit />
            },
        ]
    },
    {
        name:"404 Page",
        path:"/*",
        element:<Layout />
    }
]