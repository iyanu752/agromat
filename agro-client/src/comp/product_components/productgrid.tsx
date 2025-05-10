"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductFilters from "./productfilters"

// Mock product data
const products = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: "Heirloom Tomato",
  price: 5.99,
  unit: "lb",
  image: "/placeholder.svg?height=400&width=400",
  location: "San Juan Capistrano, CA",
}))

export default function ProductGrid() {
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({})

  const handleAddToCart = (productId: number) => {
    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true,
    }))

    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [productId]: false,
      }))
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {products.length} products</p>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-sm font-medium">Sort by:</span>
            <select className="rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="px-1 py-6">
                <ProductFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
          >
            <a href={`/products/${product.id}`} className="block overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>
            <div className="p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{product.name}</h3>
                <span className="font-semibold text-green-600">
                  ${product.price.toFixed(2)}/{product.unit}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Grown in {product.location}</p>
              <div className="mt-3">
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  variant={addedToCart[product.id] ? "default" : "outline"}
                  size="sm"
                  className={`w-full ${
                    addedToCart[product.id]
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {addedToCart[product.id] ? "Added" : "Add to cart"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="bg-green-50 font-medium text-green-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </nav>
      </div>
    </div>
  )
}
