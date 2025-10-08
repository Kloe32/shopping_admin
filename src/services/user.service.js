import axiosInstance from "../config/axiosInstance"
import { API_ROUTES } from "../config/config"


export const fetchUsers = async () =>{
    try {
      const response = await axiosInstance.get(API_ROUTES.GET_USER_URL)
      return response.data
    } catch (error) {
      console.log("User Fecthing Error ",error)
    }
  }

