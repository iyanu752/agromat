"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle } from "lucide-react";
import { getOrdersBySellerId } from "@/services/orderService";
import { useEffect, useState } from "react";

// Updated interface to match actual API response
interface OrderItem {
  productId: {
    _id: string;
    name: string;
    image?: string[];
    price: number;
    sellerId: string;
  };
  quantity: number;
  price: number;
  _id: string;
}

interface OrderUser {
  _id: string;
  email: string;
  name: string; // Changed from firstName to name to match API
  userType: string;
  userId: string;
  userLoggedIn: boolean;
}

interface Order {
  _id: string;
  userId: OrderUser;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  __v: number;
}

// Updated component
export default function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Changed from OrderWrapper[] to Order[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const sellerId = localStorage.getItem("userId");
        if (!sellerId) {
          setError("Seller ID not found");
          return;
        }
        const res = await getOrdersBySellerId(sellerId);
        console.log("API Response:", res);
        
        if (res.success) {
          setOrders(res.payload || []);
        } else {
          setError(res.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Manage and track orders for your products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => ( // Changed from orderWrapper to order
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {`ORD-${order._id.slice(-6).toUpperCase()}`}
                  </TableCell>
                  <TableCell>{order.userId.name}</TableCell> 
                  <TableCell>
                    {order.items[0]?.productId?.name || "N/A"}
                  </TableCell>
                  <TableCell>{order.items[0]?.quantity || 0}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`flex w-fit items-center gap-1 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}