"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllProducts } from "@/services/productService" // adjust based on your actual method
import { addToCart } from "@/services/cartService" // import your cart service

interface Product {
  _id: string
  name: string
  price: number
  image: string[]
  unit: string
  category: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        setProducts(res)
      } catch (error) {
        console.error("Failed to fetch products", error)
      }
    }

    fetchProducts()
  }, [])

const handleAddToCart = async (productId: string) => {
  const userId = localStorage.getItem("userId")
  if (!userId) {
    toast.error("You must be logged in to add items to your cart.")
    return
  }

  const payload = {
    userId,
    productId,
    quantity: 1,
  }

  try {
    const result = await addToCart(payload)
    if (result.success) {
      toast.success(result.message || "Added to cart successfully!")
    } else {
      toast.error(result.message || "Failed to add to cart.")
    }
  } catch (error) {
    toast.error("Something went wrong while adding to cart.")
    console.error(error)
  }
}


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="flex flex-col">
          <CardHeader>
            <img
              src={product.image[0]}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
            <CardTitle className="mt-2 text-lg font-semibold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-between">
            <p className="text-gray-700 font-medium text-sm">
              {product.category}
            </p>
            <p className="text-gray-900 font-bold text-lg">
              ₦{product.price}/{product.unit}
            </p>
            <Button
              onClick={() => handleAddToCart(product._id)}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
