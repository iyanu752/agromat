"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
//   CreditCard,
  Download,
  MessageCircle,
  Star,
  Copy,
  ExternalLink,
} from "lucide-react"

// Updated interface to match your actual data structure
interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  order: {
    _id: string
    userId: {
      email: string
      firstName: string
      supermarket: string
    }
    items: Array<{
      product: {
        name: string
        image?: string
        price: number
        sellerId?: string
      }
      quantity: number
    }>
    totalAmount: number
    deliveryAddress: string
    deliveryInstructions: string
    status: string
    orderId: string
    createdAt: string
  }
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  const [copiedTracking, setCopiedTracking] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const copyTrackingNumber = () => {
    // Generate a mock tracking number since it's not in your API
    const trackingNumber = `TRK-${order._id.slice(-8).toUpperCase()}`
    navigator.clipboard.writeText(trackingNumber)
    setCopiedTracking(true)
    setTimeout(() => setCopiedTracking(false), 2000)
  }

  // Calculate pricing breakdown
  const subtotal = order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 8.99 // Free shipping over $50
  const tax = subtotal * 0.08

  // Generate estimated delivery date (7 days from order date)
  const estimatedDelivery = new Date(order.createdAt)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] max-h-[95vh] overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-lg sm:text-xl lg:text-2xl truncate">Order Details - {order.orderId}</span>
            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base lg:text-lg">
            Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Order Timeline */}
            {order.status !== "pending" && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Order Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm lg:text-base text-gray-600">
                      {order.status === "delivered" ? "Delivered" : "Estimated Delivery"}:
                    </span>
                    <span className="font-medium text-sm sm:text-base lg:text-lg">
                      {order.status === "delivered"
                        ? new Date(order.createdAt).toLocaleDateString() // Using order date as placeholder
                        : estimatedDelivery.toLocaleDateString()}
                    </span>
                  </div>

                  {(order.status === "shipped" || order.status === "delivered") && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-sm lg:text-base text-gray-600">Tracking Number:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs sm:text-sm lg:text-base break-all">TRK-{order._id.slice(-8).toUpperCase()}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={copyTrackingNumber} className="h-6 w-6 lg:h-8 lg:w-8 p-0 flex-shrink-0">
                            <Copy className="h-3 w-3 lg:h-4 lg:w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 lg:h-8 lg:w-8 p-0 flex-shrink-0">
                            <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {copiedTracking && <p className="text-xs lg:text-sm text-green-600">Tracking number copied!</p>}
                </CardContent>
              </Card>
            )}

            {/* Products */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg lg:text-xl">Items Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 lg:p-4 border rounded-lg">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base lg:text-lg xl:text-xl line-clamp-2">{item.product.name}</h4>
                        {item.product.sellerId && (
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">Location: {item.product.sellerId}</p>
                        )}
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2 sm:text-right">
                        <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl">₦{(item.product.price * item.quantity).toFixed(2)}</p>
                        <div className="flex gap-1 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs lg:text-sm lg:px-4 lg:py-2">
                            <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            <span className="hidden sm:inline">Review</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs lg:text-sm lg:px-4 lg:py-2">
                            <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            <span className="hidden sm:inline">Contact</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm lg:text-base">
                  <p className="font-medium lg:text-lg">
                    {order.userId.firstName || "Customer"}
                  </p>
                  <p className="whitespace-pre-wrap break-words lg:text-base">
                    {order.deliveryAddress || "Address not provided"}
                  </p>
                  {order.deliveryInstructions && (
                    <div className="mt-3 p-2 lg:p-3 bg-gray-50 rounded">
                      <p className="text-xs lg:text-sm text-gray-600 font-medium">Delivery Instructions:</p>
                      <p className="text-sm lg:text-base break-words">{order.deliveryInstructions}</p>
                    </div>
                  )}
                  {order.userId.email && (
                    <p className="mt-2 text-gray-600 break-words lg:text-base">Email: {order.userId.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            {/* <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Payment processed</span>
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1">
            <Card className="lg:sticky lg:top-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg lg:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm lg:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₦{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₦{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold lg:text-lg">
                    <span>Total</span>
                    <span>₦{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 lg:space-y-3">
                  <Button className="w-full bg-transparent text-xs sm:text-sm lg:text-base lg:py-2" variant="outline">
                    <Download className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
                    Download Invoice
                  </Button>

                  {(order.status === "shipped" || order.status === "delivered") && (
                    <Button className="w-full bg-transparent text-xs sm:text-sm lg:text-base lg:py-2" variant="outline">
                      <Truck className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
                      Track Package
                    </Button>
                  )}

                  {order.status === "delivered" && (
                    <Button className="w-full bg-transparent text-xs sm:text-sm lg:text-base lg:py-2" variant="outline">
                      <Package className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
                      Buy Again
                    </Button>
                  )}

                  <Button className="w-full bg-transparent text-xs sm:text-sm lg:text-base lg:py-2" variant="outline">
                    <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}