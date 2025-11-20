import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getRoles = async () =>{
    try {
        const response = await axiosInstance.get(API_ROUTES.ROLE_URL)
        return response.data
    } catch (error) {
        console.log("Fetching Role Error:", error)
    }
}

export const addRole = async (payload) =>{
    try {
        const response = await axiosInstance.post(API_ROUTES.ROLE_URL,payload)
        return response.data
    } catch (error) {
        console.log("Adding Role Error:", error)
    }
}

export const deleteRole = async (id) =>{
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.ROLE_URL}/${id}`)
        return response.data
    } catch (error) {
        console.log("Deleting Role Error:", error)
    }
}

