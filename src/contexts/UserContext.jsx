import { createContext,useContext,useState, useEffect } from "react";
import { clearLocalStorage, getItemFromLocalStorage } from "../helper/helper";
import { STORAGE_KEY } from "../config/config";
import { routes } from "../config/routes";
const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [userData, setuserData] = useState(getItemFromLocalStorage(STORAGE_KEY.USER_DATA))

    const logout = () =>{
        clearLocalStorage()
        setuserData(null)
    }


    return <UserContext.Provider value={{userData,setuserData,logout}}>
        {children}
    </UserContext.Provider>
}

export const useUser = ()=> useContext(UserContext)