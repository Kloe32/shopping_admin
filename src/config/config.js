export const STORAGE_KEY = {
  USER_DATA: 'user-data',
  TOKEN: 'x-access-token',
}

export const API_ROUTES = {
  LOCAL_URL: 'http://localhost:8080/api/v1',
  // BASE_URL:'https://shopping-server-nerj.onrender.com/api/v1',

  //User ROUTES
  LOGIN_URL: '/user/LoginUser',
  GET_USER_URL: '/user',
  GET_ADMIN_URL: 'user/admin',
  UPDATE_USER_URL: '/user/UpdateUser',

  //Role Routes
  ROLE_URL:"/role",


  //Unit Routes
  UNIT_URL: '/unit',

  //Category Routes
  CATEGORY_URL: '/category',
}

export const EXTERNAL_API = {
  CURRENCY_RATE_URL:
    'https://v6.exchangerate-api.com/v6/44afbaa14accfcb3c3df8fdc/latest/SGD',
}


export const roleColor = {
  "Admin": "bg-blue-500",
  "Super Admin": "bg-red-500",
  "Guest":"bg-green-500"
}

export const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Manage User',
    path: '/create-user',
  },
  {
    name: 'Manage Product',
    path: '/product',
  },
  {
    name: 'Manage Order',
    path: '/order',
  },
  {
    name: 'Manage Category',
    path: '/category',
  },
  {
    name: 'Manage Unit',
    path: '/unit',
  },
]
