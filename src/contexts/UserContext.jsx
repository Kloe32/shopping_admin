import { createContext,useContext,useState, useEffect } from "react";
import { clearLocalStorage, getItemFromLocalStorage } from "../helper/helper";
import { STORAGE_KEY } from "../config/config";

const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [userData, setuserData] = useState(getItemFromLocalStorage(STORAGE_KEY.USER_DATA))

    const logout = () =>{
        clearLocalStorage()
        setuserData(null)
        window.location.reload()
    }

    return <UserContext.Provider value={{userData,setuserData,logout}}>
        {children}
    </UserContext.Provider>
}

export const useUser = ()=> useContext(UserContext)