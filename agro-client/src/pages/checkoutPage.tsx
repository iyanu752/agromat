/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { clearCart, fetchCart } from "@/services/cartService"
import { createOrder } from "@/services/orderService"
// Declare Paystack global
declare global {
  interface Window {
    PaystackPop: any
  }
}

 interface CartItem {
    id: string;
    quantity: number;
    productId: string;
    name: string;
    price: number;
    unit?: string;
    image?: string;

  }

export default function CheckoutPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);
   const [userId, setUserId] = useState<string | null>(null);
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
   const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartData = async (userId: string) => {
    try {
      const response = await fetchCart(userId);
      const transformedItems = response.items
        .filter((item: any) => item.productId)
        .map((item: any) => {
          return {
            productId: item.productId._id,
            quantity: item.quantity,
            name: item.productId.name,
            price: item.productId.price,
            unit: item.productId.unit,
            image: item.productId.image,
            category: item.productId.category,
            supermarketId: item.Supermarket,
          };
        });

      console.log("🛒 Transformed cart items:", transformedItems); // Debug log
      setCartItems(transformedItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("userId");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          phone: parsedUser.phone || "",
          email: parsedUser.email || "",
        });
        console.log(user)
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
    if (storedId) {
      setUserId(storedId);
      fetchCartData(storedId);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handlePaystackPayment = () => {
    const userString = localStorage.getItem("user")
    const user = userString ? JSON.parse(userString) : null
    if (!user || !user.email) {
      alert("User not logged in or missing email.")
      return
    }

    const ref = `ORD-${Date.now()}`;
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: Math.floor(total * 100),
      currency: "NGN",
      ref,
      callback: function (response: any) {
        (async () => {
          try {
            setIsProcessing(true);
            console.log(isProcessing)

            const orderPayload = {
              userId: userId!,
              items: cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
              totalAmount: total,
              paymentReference: response.reference,
              paymentStatus: "success",
              status: "pending",
            };

            const orderResponse = await createOrder(orderPayload);

            if (orderResponse?.success) {
              console.log("✅ Order created successfully:", orderResponse);
               console.log("userid", userId)
              await clearCart(userId!);
              window.location.href = `/orders/${response.reference}`;
              
            } else {
              console.error(
                "❌ Failed to create order:",
                orderResponse?.message
              );
              toast.error("Failed to create order. Please contact support.");
            }
          } catch (error) {
            console.error("❌ Order creation failed:", error);
            toast.error("An error occurred. Please try again.");
          } finally {
            setIsProcessing(false);
          }
        })();
      },
      onClose: () => {
        console.log("❌ Payment window closed");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Section --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main Street" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+234 123 456 7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                <Textarea id="instructions" placeholder="Leave at front door, etc." rows={2} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- Right Section: Summary --- */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      {/* <p className="text-xs text-gray-600">by {item.seller}</p> */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        {/* <Badge
                          variant={item.inStock ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge> */}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">₦{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₦{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <p className="text-xs text-green-800">
                  Your payment information is secure and encrypted
                </p>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 h-12"
                onClick={handlePaystackPayment}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Place Order - ₦{total.toFixed(2)}
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                <Clock className="h-4 w-4" />
                <span>Estimated delivery: Jul 19–21</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
