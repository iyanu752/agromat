"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react"

export default function SellerAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Sales Analytics
          </CardTitle>
          <CardDescription>Track your sales performance and customer engagement.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Sales Trend</span>
              </div>
              <div className="text-2xl font-bold">+15.2%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Customer Reach</span>
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">unique visitors</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Conversion Rate</span>
              </div>
              <div className="text-2xl font-bold">2.8%</div>
              <p className="text-xs text-muted-foreground">visitors to buyers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Organic Heirloom Tomatoes</span>
                <span className="text-sm font-medium">$149.75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Grass-Fed Beef</span>
                <span className="text-sm font-medium">$194.85</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fresh Spinach</span>
                <span className="text-sm font-medium">$62.82</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                <span className="font-medium">New order</span> for Organic Tomatoes
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Product viewed</span> - Fresh Spinach
                <div className="text-xs text-muted-foreground">4 hours ago</div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Stock alert</span> - Grass-Fed Beef running low
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
