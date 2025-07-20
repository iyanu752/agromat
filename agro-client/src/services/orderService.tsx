import API_ENDPOINTS from "@/config/endpoints";
import axios from "axios";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderPayload {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paystackRef?: string;
}

// Set up axios interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createOrder = async (orderDetails: CreateOrderPayload) => {
  try {
    console.log('📤 Sending order details:', orderDetails);
    const response = await axios.post(`${API_ENDPOINTS.ORDER}/`, orderDetails);
    console.log('📥 Order response:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
    }
    throw error;
  }
};

const getOrderByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting orders by userId:", error);
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.ORDER}/${orderId}/status`, {
      status: newStatus
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

const updatePaymentStatus = async (orderId: string, reference: string) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.ORDER}/${orderId}/verify`, {
      reference
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

// Legacy functions - keeping for backward compatibility but they may need backend route updates
const getOrdersBySellerId = async (sellerId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/seller/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by vendorId:", error);
    throw error;
  }
};

const verifyOrderCode = async (orderId: string, code: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.ORDER}/verify/${orderId}`, { code });
    return response.data;
  } catch (error) {
    console.error("Error verifying order code:", error);
    throw error;
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/vendor/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by Id:", error);
    throw error;
  }
};

const getOrderHistory = async (userId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

const assignToRider = async (orderId: string, userId: string) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.ORDER}/assignToRider/${orderId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error assigning order to rider:", error);
    throw error;
  }
};

const getOrderByOrder = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ORDER}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by orderId:", error);
    throw error;
  }
};

export {
  createOrder,
  getOrderByUserId,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getOrdersBySellerId,
  verifyOrderCode,
  getOrderById,
  getOrderHistory,
  assignToRider,
  getOrderByOrder
};