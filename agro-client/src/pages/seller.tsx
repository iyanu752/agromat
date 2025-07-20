import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, DollarSign, Users, ShoppingCart } from "lucide-react"
import Navbar from "@/comp/navbar"
import SellerProductList from "@/comp/seller_components/seller-product-list"
import SellerAnalytics from "@/comp/seller_components/seller-analytics"
import SellerOrders from "@/comp/seller_components/seller-orders"
import SellerOverview from "@/comp/seller_components/seller-overview"
import ProductUploadModal from "@/comp/seller_components/product-upload"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getProductsBySellerId } from "@/services/productService"

export const metadata = {
  title: "Seller Dashboard | AgroMat",
  description: "Manage your products and sales on AgroMat",
}

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  location: string;
  unit: string;
  image: string[];
  sold: number;
  status: string;
  harvestDate: string;
  quantity: number;
  expiryDate: string;
  method: string;
}

export default function SellerDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sellerStats = {
    totalProducts: products.length, // Use actual products count
    totalRevenue: 2450.75,
    totalOrders: 34,
    totalViews: 1250,
    activeListings: products.filter(p => p.status === 'in-stock').length, // Use actual active listings
    pendingOrders: 5,
    monthlyGrowth: 15.2,
    customerReach: 1234,
  }

  const getProducts = async () => {
    try {
      const sellerId = localStorage.getItem("userId")
      if(!sellerId){
        return
      }
      const response = await getProductsBySellerId(sellerId)
      if (response) {
        setProducts(response)
      }
    }catch (error) {
      console.error ('Error fetching products', error)
    }
  }
  
  useEffect(() => {
    getProducts()
  }, [])

  const handleProductAdded = () => {
    getProducts() // This will update the products state
    toast.success("Product created successfully!")
  }

  const handleProductUpdated = () => {
    getProducts() // This will update the products state after edit/delete
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="mt-1 text-gray-500 text-sm sm:text-base">
              Manage your products and track your sales performance
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" />
              Manage Products
            </Button>
            <Button
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">{sellerStats.activeListings} active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${sellerStats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+{sellerStats.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">{sellerStats.pendingOrders} pending orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Customer Reach</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerStats.customerReach}</div>
              <p className="text-xs text-muted-foreground">{sellerStats.totalViews} total product views</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex w-full gap-2 overflow-x-auto scrollbar-hide">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

          <TabsContent value="overview">
            <SellerOverview stats={sellerStats} />
          </TabsContent>

          <TabsContent value="products">
            <SellerProductList 
              products={products} 
              onProductUpdated={handleProductUpdated} 
            />
          </TabsContent>

          <TabsContent value="orders">
            <SellerOrders />
          </TabsContent>

          <TabsContent value="analytics">
            <SellerAnalytics />
          </TabsContent>
        </Tabs>
      </main>

      <ProductUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  )
}