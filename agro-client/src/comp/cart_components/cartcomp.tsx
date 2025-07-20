"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchCart, updateCartItem, removeCartItem } from "@/services/cartService"

interface Product {
  _id: string
  name: string
  price: number
  image: string[]
  unit: string
  category: string
}

interface CartItem {
  productId: Product 
  quantity: number
}

export default function CartPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)

  const loadCart = async (uid: string) => {
    setLoading(true)
    try {
      const cartData = await fetchCart(uid)
      console.log("Fetched cart:", cartData)
      
      // Check if cartData has the expected structure
      if (cartData && cartData.items) {
        // Filter out items with null productId
        const validItems = cartData.items.filter((item: CartItem) => item.productId !== null)
        setCartItems(validItems)
      } else if (Array.isArray(cartData)) {
        // Handle case where cartData is directly an array
        const validItems = cartData.filter((item: CartItem) => item.productId !== null)
        setCartItems(validItems)
      } else {
        console.warn("Unexpected cart data structure:", cartData)
        setCartItems([])
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed._id) {
          setUserId(parsed._id)
          loadCart(parsed._id)
        }
      } catch (err) {
        console.error("Error parsing user data:", err)
      }
    }
  }, [])

  const updateQuantity = async (productId: string, newQty: number) => {
    if (!userId || newQty < 1) return
    
    try {
      await updateCartItem(userId, productId, newQty)
      await loadCart(userId)
    } catch (err) {
      console.error("Failed to update cart item:", err)
    }
  }

  const removeItem = async (productId: string) => {
    if (!userId) return
    
    try {
      await removeCartItem(userId, productId)
      await loadCart(userId)
    } catch (err) {
      console.error("Failed to remove cart item:", err)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => {
    if (!item.productId) return sum
    return sum + item.productId.price * item.quantity
  }, 0)

  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={cartRef}>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
            {itemCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 origin-top-right animate-in fade-in-0 zoom-in-95 md:w-96">
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className="flex flex-col p-4">
              <div className="flex items-center justify-between pb-4">
                <h3 className="font-medium">Your Cart ({itemCount} item{itemCount !== 1 && "s"})</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  Loading cart...
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  <ShoppingCart className="mx-auto mb-2 h-8 w-8" />
                  Your cart is empty
                </div>
              ) : (
                <>
                  <ScrollArea className="max-h-[300px]">
                    <div className="space-y-4">
                      {cartItems.map((item, index) => {
                        const product = item.productId
                        
                        // Additional null check with detailed logging
                        if (!product) {
                          console.warn(`Product is null for cart item at index ${index}:`, item)
                          return null
                        }

                        return (
                          <div key={`${product._id}-${index}`} className="flex items-center gap-3">
                            <div className="h-14 w-14 overflow-hidden rounded-md border">
                              <img
                                src={product.image?.[0] || "/placeholder.svg"}
                                alt={product.name || "Product"}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  // Prevent infinite loop by only setting fallback once
                                  if (!target.src.includes("placeholder.svg")) {
                                    target.src = "/placeholder.svg"
                                  }
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{product.name || "Unknown Product"}</h4>
                              <p className="text-xs text-gray-500">${product.price?.toFixed(2) || "0.00"} per {product.unit || "item"}</p>
                              <div className="flex items-center justify-between text-xs mt-1">
                                <div className="flex items-center border rounded">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(product._id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="px-2 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(product._id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">${(product.price * item.quantity).toFixed(2)}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500 hover:text-red-700"
                                    onClick={() => removeItem(product._id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href="/checkout">Checkout</a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/cart">View Cart</a>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}