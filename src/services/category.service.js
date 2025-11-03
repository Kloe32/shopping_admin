import axiosInstance from '../config/axiosInstance'
import { API_ROUTES } from '../config/config'

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.CATEGORY_URL)
    return response.data
  } catch (error) {
    console.log('Category Fecthing Error ', error)
  }
}

export const addNewCategory = async (data) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CATEGORY_URL, {
      name: data,
    })
    return response.data
  } catch (error) {
    console.log('Category Adding Error', error)
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ROUTES.CATEGORY_URL}/${id}`
    )
    return response.data
  } catch (error) {
    console.log('Deleting Category Error', error)
  }
}
export const updateCategory = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `${API_ROUTES.CATEGORY_URL}/${id}`,
      payload
    )
    return response.data
  } catch (error) {
    console.log('Category Updating Error', error)
  }
}
