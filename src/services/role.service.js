import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getRoles = async () =>{
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ROLE_URL)
        return response.data
    } catch (error) {
        console.log("Fetching Role Error:", error)
    }
}


