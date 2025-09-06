import { FaUserCog } from "react-icons/fa";
import { MdCategory,MdCurrencyExchange, MdLogout } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { GoTag } from "react-icons/go";

export const routes =[
    {
        name:"Manage User",
        path:"create-user",
        icon: <FaUserCog />
    },
    {
        name:"Manage Product",
        path:"product",
        icon:<GoTag />
    },
    {
        name:"Manage Category",
        path:"category",
        icon:<MdCategory />
    },
    {
        name:"Manage Order",
        path:"order",
        icon: <IoIosPaper />
    },
    {
        name:"Manage Unit",
        path:"unit",
        icon: <MdCurrencyExchange />
    },
];
