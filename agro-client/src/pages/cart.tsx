// import type { Metadata } from "next"
// import Link from "next/link"
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Truck, ShieldCheck } from "lucide-react"
// import Header from "@/components/header"
import Navbar from "@/comp/navbar"

export const metadata = {
  title: "Shopping Cart | AgroMat",
  description: "View and manage your shopping cart",
}

// Mock cart data
const cartItems = [
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

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <main className="container px-[32px] py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-500">Review and update your items before checkout</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">
                    Cart Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                          <p className="text-base font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} / each</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100">
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </button>
                            <span className="flex h-8 w-10 items-center justify-center text-sm">{item.quantity}</span>
                            <button className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100">
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </button>
                          </div>
                          <button className="text-sm font-medium text-red-600 hover:text-red-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild className="flex items-center">
                <a href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="mt-6 w-full bg-green-600 hover:bg-green-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-medium">Have a promo code?</h2>
              <div className="flex gap-2">
                <Input placeholder="Enter code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Free shipping on orders over $50</h3>
                    <p className="text-xs text-gray-500">
                      All orders are processed and delivered within 2-3 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Secure payment</h3>
                    <p className="text-xs text-gray-500">We use industry-leading encryption to keep your data safe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
