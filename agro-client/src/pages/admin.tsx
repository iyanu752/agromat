import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingBag, BarChart3, Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Navbar from "@/comp/navbar"
import AdminUserManagement from "@/comp/admin_components/admin-user-managment"
import AdminProductApproval from "@/comp/admin_components/admin-product-approval"
// import AdminAnalytics from "@/comp/admin_components/admin-analytics"
// import AdminSettings from "@/comp/admin_components/admin-settings"

export const metadata = {
  title: "Admin Dashboard | AgroMat",
  description: "Manage the AgroMat platform",
}

export default function AdminDashboardPage() {
  // Mock admin data
  const adminStats = {
    totalUsers: 1250,
    newUsers: 45,
    pendingApprovals: 12,
    totalProducts: 345,
    pendingProducts: 28,
    reportedProducts: 5,
    totalOrders: 567,
    revenue: 25678.45,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-gray-500">Manage users, products, and platform settings</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+{adminStats.newUsers} new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">{adminStats.pendingProducts} pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">${adminStats.revenue.toLocaleString()} revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.pendingApprovals + adminStats.pendingProducts}</div>
              <p className="text-xs text-muted-foreground">Require your attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card className="bg-amber-50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Clock className="mb-2 h-8 w-8 text-amber-500" />
              <h3 className="mb-1 text-center text-lg font-medium">Pending Approvals</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                {adminStats.pendingApprovals} sellers awaiting verification
              </p>
              <Button asChild size="sm" className="w-full">
                <a href="#user-management">Review Now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <AlertTriangle className="mb-2 h-8 w-8 text-red-500" />
              <h3 className="mb-1 text-center text-lg font-medium">Reported Items</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                {adminStats.reportedProducts} products flagged by users
              </p>
              <Button asChild size="sm" variant="destructive" className="w-full">
                <a href="#product-approval">Investigate</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <ShoppingBag className="mb-2 h-8 w-8 text-blue-500" />
              <h3 className="mb-1 text-center text-lg font-medium">Product Approvals</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                {adminStats.pendingProducts} products need review
              </p>
              <Button asChild size="sm" variant="outline" className="w-full">
                <a href="#product-approval">Review Products</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <CheckCircle className="mb-2 h-8 w-8 text-green-600" />
              <h3 className="mb-1 text-center text-lg font-medium">Platform Health</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">All systems operational</p>
              <Button asChild size="sm" variant="outline" className="w-full">
                <a href="#settings">View Status</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="users" id="user-management">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="products" id="product-approval">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Product Approval
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" id="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <AdminUserManagement />
          </TabsContent>

          <TabsContent value="products">
            <AdminProductApproval />
          </TabsContent>

          <TabsContent value="analytics">
            {/* <AdminAnalytics /> */}
          </TabsContent>

          <TabsContent value="settings">
            {/* <AdminSettings /> */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
