const BASE_URL =  import.meta.env.VITE_VITE_BASE_URL

const API_ENDPOINTS = {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    PRODUCT: `${BASE_URL}/products`,
    CART: `${BASE_URL}/cart`,
    ORDER: `${BASE_URL}/orders`
}

export default API_ENDPOINTS;