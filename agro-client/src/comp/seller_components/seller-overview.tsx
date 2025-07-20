"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, AlertCircle, CheckCircle, Clock, Package, DollarSign, Eye, Star } from "lucide-react"

interface SellerOverviewProps {
  stats: {
    totalProducts: number
    totalRevenue: number
    totalOrders: number
    totalViews: number
    activeListings: number
    pendingOrders: number
    monthlyGrowth: number
    customerReach: number
  }
}

export default function SellerOverview({ stats }: SellerOverviewProps) {
  // Mock data for recent activities and alerts
  const recentActivities = [
    {
      type: "order",
      message: "New order for Organic Heirloom Tomatoes",
      time: "2 hours ago",
      status: "new",
    },
    {
      type: "view",
      message: "Your Fresh Spinach was viewed 15 times",
      time: "4 hours ago",
      status: "info",
    },
    {
      type: "stock",
      message: "Grass-Fed Beef is running low (2 items left)",
      time: "6 hours ago",
      status: "warning",
    },
    {
      type: "review",
      message: "New 5-star review on Organic Carrots",
      time: "1 day ago",
      status: "positive",
    },
  ]

  const topProducts = [
    { name: "Organic Heirloom Tomatoes", revenue: 149.75, orders: 25 },
    { name: "Grass-Fed Beef", revenue: 194.85, orders: 15 },
    { name: "Fresh Spinach", revenue: 62.82, orders: 18 },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-4 w-4 text-green-600" />
      case "view":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "stock":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monthly Growth</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                +{stats.monthlyGrowth}%
              </Badge>
            </div>
            <Progress value={stats.monthlyGrowth} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Your sales have grown by {stats.monthlyGrowth}% compared to last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Orders to Process</span>
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                {stats.pendingOrders}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Stock Items</span>
              <Badge variant="outline" className="bg-red-50 text-red-700">
                3
              </Badge>
            </div>
            <Button asChild size="sm" className="w-full">
              <a href="/seller/dashboard?tab=orders">View All</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">This Month</span>
              <span className="font-medium">${stats.totalRevenue.toFixed(2)}</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground">75% of your $3,000 monthly goal achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your products and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <a href="/seller/activity">View All Activity</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Your best-selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${product.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <a href="/seller/dashboard?tab=analytics">View Analytics</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your seller account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-auto flex-col gap-2 p-4">
              <a href="/seller/products/new">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 p-4">
              <a href="/seller/dashboard?tab=orders">
                <Clock className="h-6 w-6" />
                <span>Process Orders</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 p-4">
              <a href="/seller/dashboard?tab=analytics">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </a>
            </Button>
            <Button asChild variant="outline" className="h-auto flex-col gap-2 p-4">
              <a href="/seller/settings">
                <CheckCircle className="h-6 w-6" />
                <span>Account Settings</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
