import API_ENDPOINTS from "@/config/endpoints";
import axios from "axios";

interface Product {
  name: string;
  category: string;
  description: string;
  price: number;
  location: string;
  quantity: number;
  image: string[];
  harvestDate: string;
  expiryDate: string;
  method: string;
}

const createProducts = async (productData: Product) => {
  try {
    const response = await axios.post(API_ENDPOINTS.PRODUCT, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
  }
};

const getProductsBySellerId = async (sellerId: string) => {
    try{
    const response = await axios.get(`${API_ENDPOINTS.PRODUCT}?sellerId=${sellerId}`);
    return response.data
    }catch(error) {
        console.error("Error fetching products", error)
    }
}

const getAllProducts = async () => {
  try{
    const response = await axios.get(API_ENDPOINTS.PRODUCT)
    return response.data
  }catch (error){
    console.error("Error fetching products", error)
  }
}

const updateProduct = async (ProductId: string, updatedProduct: Product) => {
  try{
    const response = await axios.put(`${API_ENDPOINTS.PRODUCT}/${ProductId}`, updatedProduct)
    return response.data
  }catch(error) {
    console.error("Error updating product", error)
  }
}

const deleteProduct = async (productId: string) => {
  try{
    const response = await axios.delete(`${API_ENDPOINTS.PRODUCT}/${productId}`)
    return response.data
  }catch (error) {
    console.error ("Error deleting priduct", error)
  }
}

export { createProducts, getProductsBySellerId, updateProduct, deleteProduct, getAllProducts };
