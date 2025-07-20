/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import {  Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Package, Truck, CheckCircle, Clock,
  Search, Filter, Eye, Download, Star, MessageCircle
} from "lucide-react"
import { getOrderByUserId } from "@/services/orderService"
import OrderDetailsModal from "@/components/ui/orderDetails"

interface Product {
  name: string;
  image?: string;
  price: number;
  sellerId?: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface UserOrder {
  _id: string;
  userId: {
    email: string;
    firstName: string;
    supermarket: string;
  };
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  deliveryInstructions: string;
  status: string;
  orderId: string;
  createdAt: string;
}

// Raw data structure from API
interface RawOrderItem {
  productId: {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    location: string;
    quantity: number;
    image: string[];
    status: string;
    unit: string;
    sold: number;
    harvestDate: string;
    expiryDate: string;
    method: string;
    createdAt: string;
    __v: number;
  };
  quantity: number;
  price: number;
  _id: string;
}

interface RawOrder {
  _id: string;
  userId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    supermarket?: string;
  };
  items: RawOrderItem[];
  totalAmount: number;
  paymentStatus: string;
  status: string;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  createdAt: string;
  __v: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<UserOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Transform raw order data to match component interface
const transformOrderData = (rawOrders: RawOrder[]): UserOrder[] => {
  return rawOrders.map(rawOrder => ({
    _id: rawOrder._id,
    userId: {
      email: rawOrder.userId?.email || '',
      firstName: rawOrder.userId?.firstName || '',
      supermarket: rawOrder.userId?.supermarket || ''
    },
    items: rawOrder.items
      .filter(rawItem => rawItem.productId !== null) 
      .map(rawItem => ({
        product: {
          name: rawItem.productId.name,
          image: rawItem.productId.image?.[0] || undefined,
          price: rawItem.productId.price,
        },
        quantity: rawItem.quantity
      })),
    totalAmount: rawOrder.totalAmount,
    deliveryAddress: rawOrder.deliveryAddress || '',
    deliveryInstructions: rawOrder.deliveryInstructions || '',
    status: rawOrder.status,
    orderId: `ORD-${rawOrder._id.slice(-6).toUpperCase()}`, 
    createdAt: rawOrder.createdAt
  }))
}

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        setLoading(true)
        const userId = localStorage.getItem("userId")
        if (!userId) {
          setError("User ID not found.")
          return
        }
        const response = await getOrderByUserId(userId)
        
        // Transform the data to match component interface
        const rawOrders = response?.orders || [];
        const transformedOrders = transformOrderData(rawOrders);
        setOrders(transformedOrders)
        
      } catch (err) {
        setError("Failed to load orders.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getUserOrder()
  }, [])

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

  const handleViewDetails = (order: UserOrder) => {
    console.log('Opening order details for:', order.orderId)
    setSelectedOrder(order)
    setIsModalOpen(true)
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

  const filteredOrders = (status?: string): UserOrder[] => {
    if (!Array.isArray(orders)) return []
    return status ? orders.filter((o) => o.status === status) : orders
  }

  const renderOrderCard = (order: UserOrder) => (
    <Card key={order._id} className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg truncate">{order.orderId}</CardTitle>
            <CardDescription className="text-sm">
              Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
            <Badge className={`${getStatusColor(order.status)} w-fit`}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
            <div className="text-left sm:text-right">
              <p className="font-semibold text-base sm:text-lg">₦{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-lg">
              <img
                src={item.product?.image || "/placeholder.svg"}
                alt={item.product?.name || "Product"}
                width={60}
                height={60}
                className="w-12 h-12 sm:w-15 sm:h-15 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm sm:text-base line-clamp-2">{item.product?.name}</h4>
                {item.product?.sellerId && (
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Location: {item.product.sellerId}</p>
                )}
                <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="w-full sm:w-auto text-left sm:text-right">
                <p className="font-semibold text-sm sm:text-base">₦{(item.product?.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)} className="flex-1 sm:flex-none text-xs sm:text-sm"> 
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">Details</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Download Invoice</span>
            <span className="sm:hidden">Invoice</span>
          </Button>
          {order.status === "delivered" && (
            <>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Write Review</span>
                <span className="sm:hidden">Review</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
                <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Buy Again</span>
                <span className="sm:hidden">Buy</span>
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Contact Seller</span>
            <span className="sm:hidden">Contact</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Track and manage your orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search orders..." 
            className="pl-10 text-sm sm:text-base h-10 sm:h-11" 
          />
        </div>
        <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent h-10 sm:h-11 px-4 text-sm sm:text-base">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>

      {loading && (
        <div className="text-center py-12 sm:py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Loading orders...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-12 sm:py-16">
          <p className="text-sm sm:text-base text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-max sm:w-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-4">
                All ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm px-2 sm:px-4">
                Pending ({filteredOrders("pending").length})
              </TabsTrigger>
              <TabsTrigger value="processing" className="text-xs sm:text-sm px-2 sm:px-4">
                Processing ({filteredOrders("processing").length})
              </TabsTrigger>
              <TabsTrigger value="shipped" className="text-xs sm:text-sm px-2 sm:px-4">
                Shipped ({filteredOrders("shipped").length})
              </TabsTrigger>
              <TabsTrigger value="delivered" className="text-xs sm:text-sm px-2 sm:px-4">
                Delivered ({filteredOrders("delivered").length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredOrders().length === 0 ? (
              <EmptyState icon={Package} message="No orders found" />
            ) : (
              <div className="grid gap-4">
                {filteredOrders().map(renderOrderCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filteredOrders("pending").length === 0 ? (
              <EmptyState icon={Clock} message="No pending orders" />
            ) : (
              <div className="grid gap-4">
                {filteredOrders("pending").map(renderOrderCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            {filteredOrders("processing").length === 0 ? (
              <EmptyState icon={Clock} message="No processing orders" />
            ) : (
              <div className="grid gap-4">
                {filteredOrders("processing").map(renderOrderCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipped" className="space-y-4">
            {filteredOrders("shipped").length === 0 ? (
              <EmptyState icon={Truck} message="No shipped orders" />
            ) : (
              <div className="grid gap-4">
                {filteredOrders("shipped").map(renderOrderCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {filteredOrders("delivered").length === 0 ? (
              <EmptyState icon={CheckCircle} message="No delivered orders" />
            ) : (
              <div className="grid gap-4">
                {filteredOrders("delivered").map(renderOrderCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {selectedOrder && (
        <OrderDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          order={selectedOrder} 
        />
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EmptyState({ icon: Icon, message }: { icon: any; message: string }) {
  return (
    <div className="text-center py-12 sm:py-16">
      <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">Your orders will appear here once available.</p>
    </div>
  )
}