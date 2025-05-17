"use client"

import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Heirloom Tomato",
    price: 5.99,
    quantity: 2,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Organic Spinach",
    price: 3.49,
    quantity: 1,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Fresh Strawberries",
    price: 6.99,
    quantity: 3,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function CartPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState(initialCartItems)
  const cartRef = useRef<HTMLDivElement>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Close the cart when clicking outside
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
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Open cart</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 origin-top-right animate-in fade-in-0 zoom-in-95 md:w-96">
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className="flex flex-col p-4">
              <div className="flex items-center justify-between pb-4">
                <h3 className="font-medium">
                  Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="mb-4 text-sm text-muted-foreground">Your cart is empty</p>
                  <Button
                    asChild
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <a href="/products">Browse Products</a>
                  </Button>
                </div>
              ) : (
                <>
                  <ScrollArea className="max-h-[300px]">
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="h-14 w-14 overflow-hidden rounded-md border">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 rounded-md border">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-none"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                  <span className="sr-only">Decrease quantity</span>
                                </Button>
                                <span className="flex h-6 w-6 items-center justify-center text-xs">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-none"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                  <span className="sr-only">Increase quantity</span>
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-muted-foreground hover:text-red-500"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">Remove item</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild className="bg-green-600 hover:bg-green-700" onClick={() => setIsOpen(false)}>
                      <a href="/checkout">Checkout</a>
                    </Button>
                    <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
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
