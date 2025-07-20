const BASE_URL = "http://localhost:3000/api"

const API_ENDPOINTS = {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    PRODUCT: `${BASE_URL}/products`,
    CART: `${BASE_URL}/cart`,
    ORDER: `${BASE_URL}/orders`
}

export default API_ENDPOINTS;