import axiosInstance from '../config/axiosInstance'
import { API_ROUTES } from '../config/config'

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.GET_ADMIN_URL)
    return response.data
  } catch (error) {
    console.log('Admin Fecthing Error ', error)
  }
}
