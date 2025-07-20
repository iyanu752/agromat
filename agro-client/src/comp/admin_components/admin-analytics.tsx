"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, PieChart, Users, ShoppingBag, DollarSign } from "lucide-react"
import { useEffect, useRef } from "react"

export default function AdminAnalytics() {
  const userChartRef = useRef<HTMLCanvasElement>(null)
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const categoryChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // User Growth Chart
    if (userChartRef.current) {
      const ctx = userChartRef.current.getContext("2d")
      if (ctx) {
        // Set canvas dimensions
        userChartRef.current.width = userChartRef.current.offsetWidth
        userChartRef.current.height = 250

        // Sample data for user growth
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        const buyerData = [120, 150, 180, 220, 280, 320]
        const sellerData = [20, 25, 35, 40, 55, 65]

        // Chart configuration
        const padding = 40
        const chartWidth = userChartRef.current.width - padding * 2
        const chartHeight = userChartRef.current.height - padding * 2
        const maxValue = Math.max(...buyerData, ...sellerData) * 1.1
        const xStep = chartWidth / (months.length - 1)
        const yStep = chartHeight / maxValue

        // Draw axes
        ctx.beginPath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, userChartRef.current.height - padding)
        ctx.lineTo(userChartRef.current.width - padding, userChartRef.current.height - padding)
        ctx.stroke()

        // Draw grid lines
        ctx.beginPath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 0.5
        for (let i = 1; i <= 5; i++) {
          const y = userChartRef.current.height - padding - (chartHeight / 5) * i
          ctx.moveTo(padding, y)
          ctx.lineTo(userChartRef.current.width - padding, y)
        }
        ctx.stroke()

        // Draw x-axis labels
        ctx.fillStyle = "#64748b"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        months.forEach((month, i) => {
          const x = padding + xStep * i
          ctx.fillText(month, x, userChartRef.current.height - padding + 15)
        })

        // Draw y-axis labels
        ctx.textAlign = "right"
        for (let i = 0; i <= 5; i++) {
          const y = userChartRef.current.height - padding - (chartHeight / 5) * i
          ctx.fillText(`${Math.round((maxValue / 5) * i)}`, padding - 10, y + 3)
        }

        // Draw buyer data line
        ctx.beginPath()
        ctx.strokeStyle = "#16a34a"
        ctx.lineWidth = 2
        buyerData.forEach((value, i) => {
          const x = padding + xStep * i
          const y = userChartRef.current.height - padding - value * yStep
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.stroke()

        // Draw seller data line
        ctx.beginPath()
        ctx.strokeStyle = "#2563eb"
        ctx.lineWidth = 2
        sellerData.forEach((value, i) => {
          const x = padding + xStep * i
          const y = userChartRef.current.height - padding - value * yStep
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.stroke()

        // Draw legend
        const legendX = padding + 10
        const legendY = padding + 20
        const legendSpacing = 15

        // Buyers
        ctx.beginPath()
        ctx.strokeStyle = "#16a34a"
        ctx.lineWidth = 2
        ctx.moveTo(legendX, legendY)
        ctx.lineTo(legendX + 20, legendY)
        ctx.stroke()
        ctx.fillStyle = "#64748b"
        ctx.textAlign = "left"
        ctx.fillText("Buyers", legendX + 25, legendY + 3)

        // Sellers
        ctx.beginPath()
        ctx.strokeStyle = "#2563eb"
        ctx.lineWidth = 2
        ctx.moveTo(legendX, legendY + legendSpacing)
        ctx.lineTo(legendX + 20, legendY + legendSpacing)
        ctx.stroke()
        ctx.fillText("Sellers", legendX + 25, legendY + legendSpacing + 3)
      }
    }

    // Revenue Chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext("2d")
      if (ctx) {
        // Set canvas dimensions
        revenueChartRef.current.width = revenueChartRef.current.offsetWidth
        revenueChartRef.current.height = 250

        // Sample data for revenue
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        const revenueData = [5000, 7500, 10000, 8500, 12000, 15000]

        // Chart configuration
        const padding = 40
        const chartWidth = revenueChartRef.current.width - padding * 2
        const chartHeight = revenueChartRef.current.height - padding * 2
        const maxValue = Math.max(...revenueData) * 1.1
        const xStep = chartWidth / (months.length - 1)
        const yStep = chartHeight / maxValue

        // Draw axes
        ctx.beginPath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, revenueChartRef.current.height - padding)
        ctx.lineTo(revenueChartRef.current.width - padding, revenueChartRef.current.height - padding)
        ctx.stroke()

        // Draw grid lines
        ctx.beginPath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 0.5
        for (let i = 1; i <= 5; i++) {
          const y = revenueChartRef.current.height - padding - (chartHeight / 5) * i
          ctx.moveTo(padding, y)
          ctx.lineTo(revenueChartRef.current.width - padding, y)
        }
        ctx.stroke()

        // Draw x-axis labels
        ctx.fillStyle = "#64748b"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        months.forEach((month, i) => {
          const x = padding + xStep * i
          ctx.fillText(month, x, revenueChartRef.current.height - padding + 15)
        })

        // Draw y-axis labels
        ctx.textAlign = "right"
        for (let i = 0; i <= 5; i++) {
          const y = revenueChartRef.current.height - padding - (chartHeight / 5) * i
          ctx.fillText(`$${((maxValue / 5) * i).toLocaleString()}`, padding - 10, y + 3)
        }

        // Draw revenue bars
        const barWidth = xStep * 0.6
        revenueData.forEach((value, i) => {
          const x = padding + xStep * i - barWidth / 2
          const y = revenueChartRef.current.height - padding - value * yStep
          const height = value * yStep

          // Create gradient
          const gradient = ctx.createLinearGradient(0, y, 0, revenueChartRef.current.height - padding)
          gradient.addColorStop(0, "#16a34a")
          gradient.addColorStop(1, "#4ade80")

          ctx.fillStyle = gradient
          ctx.fillRect(x, y, barWidth, height)
        })
      }
    }

    // Category Chart (Pie)
    if (categoryChartRef.current) {
      const ctx = categoryChartRef.current.getContext("2d")
      if (ctx) {
        // Set canvas dimensions
        categoryChartRef.current.width = categoryChartRef.current.offsetWidth
        categoryChartRef.current.height = 250

        // Sample data for categories
        const categories = [
          { name: "Fruits & Vegetables", value: 35, color: "#16a34a" },
          { name: "Meat & Poultry", value: 25, color: "#dc2626" },
          { name: "Dairy & Eggs", value: 20, color: "#2563eb" },
          { name: "Grains & Cereals", value: 15, color: "#eab308" },
          { name: "Other", value: 5, color: "#64748b" },
        ]

        const total = categories.reduce((sum, category) => sum + category.value, 0)
        const centerX = categoryChartRef.current.width / 2
        const centerY = categoryChartRef.current.height / 2
        const radius = Math.min(centerX, centerY) - 40

        let startAngle = 0
        categories.forEach((category) => {
          const sliceAngle = (2 * Math.PI * category.value) / total

          // Draw slice
          ctx.beginPath()
          ctx.fillStyle = category.color
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
          ctx.closePath()
          ctx.fill()

          // Draw label
          const labelAngle = startAngle + sliceAngle / 2
          const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
          const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

          ctx.fillStyle = "#fff"
          ctx.font = "bold 12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${category.value}%`, labelX, labelY)

          startAngle += sliceAngle
        })

        // Draw legend
        const legendX = 10
        const legendY = categoryChartRef.current.height - 100
        const legendSpacing = 20

        ctx.font = "12px sans-serif"
        ctx.textAlign = "left"

        categories.forEach((category, i) => {
          const y = legendY + i * legendSpacing

          // Draw color box
          ctx.fillStyle = category.color
          ctx.fillRect(legendX, y - 8, 12, 12)

          // Draw label
          ctx.fillStyle = "#64748b"
          ctx.fillText(category.name, legendX + 20, y)
        })
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Platform Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="last6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last6months">Last 6 months</SelectItem>
              <SelectItem value="lastyear">Last year</SelectItem>
              <SelectItem value="alltime">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345</div>
            <p className="text-xs text-muted-foreground">+8.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25,678.45</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Growth
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <BarChart3 className="mr-2 h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="categories">
            <PieChart className="mr-2 h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly growth of buyers and sellers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <canvas ref={userChartRef} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly platform revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <canvas ref={revenueChartRef} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Distribution of products by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <canvas ref={categoryChartRef} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
