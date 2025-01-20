export const API_BASE_URL: string = "http://192.168.10.12:4004";
export const IMAGE_BASE_URL: string = "http://192.168.10.12:9009";//admin pannel server
export const DEFUALT_IMAGE_URL: string = "https://images.bhimagold.com/admin/images/1e4c0810-60ae-11ef-84a3-4b5d62a641ee.webp?w=256&q=75"
export const GET_BANNER_URL: string = `${API_BASE_URL}/api/banners`;
export const GET_CATEGORY_URL: string = `${API_BASE_URL}/api/get-category`;
export const PRODUCT_LIST_URL: string = `${API_BASE_URL}/api/products`;
export const PRODUCT_DETAILS_URL: string = `${API_BASE_URL}/api/productdetails`;
export const CUSTOMER_REGISTRATION_URL: string = `${API_BASE_URL}/api/register`;
export const CUSTOMER_LOGIN_URL: string = `${API_BASE_URL}/api/login`;
export const ADD_TO_CART:string = `${API_BASE_URL}/api/add-to-cart`;
export const GET_CART:string = `${API_BASE_URL}/api/cart`
export const DELETE_CART_ITEM:string = `${API_BASE_URL}/api/delete-cart-items`
export const ORDER_LIST:string = `${API_BASE_URL}/api/getorder`
export const CREATE_ORDER:string = `${API_BASE_URL}/api/create-order`