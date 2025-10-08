import axiosInstance from "../config/axiosInstance"
import { API_ROUTES, EXTERNAL_API } from "../config/config"


export const fetchUnits = async () =>{
    try {
      const response = await axiosInstance.get(API_ROUTES.UNIT_URL)
      return response.data
    } catch (error) {
      console.log("User Fecthing Error ",error)
    }
  }

export const fetchRates = async()=>{
    try {
        const response = await axiosInstance.get(EXTERNAL_API.CURRENCY_RATE_URL)
        return response.data
    } catch (error) {
        
    }
}

export const addNewUnit = async (data)=>{
    try {
        const response = await axiosInstance.post(API_ROUTES.UNIT_URL,{name:data})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteUnit = async (id)=>{
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.UNIT_URL}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const updateUnit = async (id,payload)=>{
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UNIT_URL}/${id}`,payload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
