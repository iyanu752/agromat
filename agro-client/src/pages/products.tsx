import { Leaf } from "lucide-react"
import ProductFilters from "@/comp/product_components/productfilters"
import ProductGrid from "@/comp/product_components/productgrid"
export default function Products() {
    return(
    <div className="min-h-screen p-[32px] bg-gray-50">
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fresh Products</h1>
            <p className="mt-1 text-gray-500">Browse our selection of sustainably grown produce</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            <Leaf className="h-4 w-4" />
            <span>All products are organically grown</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <ProductFilters />
          </aside>
          <main>
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
    )
}