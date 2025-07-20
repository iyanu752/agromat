import { Leaf } from "lucide-react"
import ProductFilters from "@/comp/product_components/productfilters"
import ProductGrid from "@/comp/product_components/productgrid"


export default function Products() {


  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fresh Products</h1>
            <p className="mt-1 text-gray-500 text-sm sm:text-base">
              Browse our selection of sustainably grown produce
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            <Leaf className="h-4 w-4" />
            <span>All products are organically grown</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {/* Filters - show on mobile above the grid */}
          <div className="block md:hidden">
            <ProductFilters />
          </div>

          {/* Filters - for medium and up */}
          <aside className="hidden md:block">
            <ProductFilters />
          </aside>

          {/* Product Grid */}
          <main>
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
