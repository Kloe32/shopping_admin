import axiosInstance from '../config/axiosInstance'
import { API_ROUTES } from '../config/config'

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.GET_ADMIN_URL)
    return response?.data
  } catch (error) {
    console.log('Admin Fecthing Error ', error)
  }
}

export const addUser = async(payload)=>{
  try{
    const response = await axiosInstance.post(API_ROUTES?.CREATE_USER_URL,payload)
    return response?.data
  }catch(error){
    console.log("User Adding Error",error)
  }
}

export const deleteUser = async (id) =>{
  try {
    const response = await axiosInstance.delete(`${API_ROUTES?.DELETE_USER_URL}/${id}`)
    return response?.data
  } catch (error) {
    console.log("User Deleting Error",error)
  }
}
