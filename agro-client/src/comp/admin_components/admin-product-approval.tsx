"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock product data
const products = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    seller: "Green Farms Co.",
    category: "Fruits & Vegetables",
    price: 5.99,
    status: "pending",
    submittedDate: "2023-04-15",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Fresh Spinach",
    seller: "Healthy Greens",
    category: "Fruits & Vegetables",
    price: 3.49,
    status: "approved",
    submittedDate: "2023-04-10",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Grass-Fed Beef",
    seller: "Natural Meats",
    category: "Meat & Poultry",
    price: 12.99,
    status: "pending",
    submittedDate: "2023-04-12",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Organic Milk",
    seller: "Happy Cows Dairy",
    category: "Dairy & Eggs",
    price: 4.99,
    status: "rejected",
    submittedDate: "2023-04-08",
    image: "/placeholder.svg?height=400&width=400",
    rejectionReason: "Insufficient product information",
  },
  {
    id: 5,
    name: "Farm Fresh Eggs",
    seller: "Country Farms",
    category: "Dairy & Eggs",
    price: 6.49,
    status: "flagged",
    submittedDate: "2023-04-05",
    image: "/placeholder.svg?height=400&width=400",
    flagReason: "Reported by 3 users for misleading description",
  },
]

export default function AdminProductApproval() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return null
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(term) ||
            product.seller.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term),
        ),
      )
    }
  }

  const filterByStatus = (status: string | null) => {
    if (!status) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.status === status))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Approval</CardTitle>
        <CardDescription>Review and approve products submitted by sellers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => filterByStatus(null)}>
              All Products
            </TabsTrigger>
            <TabsTrigger value="pending" onClick={() => filterByStatus("pending")}>
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved" onClick={() => filterByStatus("approved")}>
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" onClick={() => filterByStatus("rejected")}>
              Rejected
            </TabsTrigger>
            <TabsTrigger value="flagged" onClick={() => filterByStatus("flagged")}>
              Flagged
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-md border">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.seller}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`flex w-fit items-center gap-1 ${getStatusColor(product.status)}`}
                    >
                      {getStatusIcon(product.status)}
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {product.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {product.status === "flagged" && (
                          <>
                            <DropdownMenuItem className="text-orange-600">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Review Flag
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
