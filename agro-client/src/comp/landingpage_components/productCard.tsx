
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  location: string
  imageUrl: string
}

export default function ProductCard({ name, price, location, imageUrl }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <a href="#" className="block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </a>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <span className="font-semibold text-green-600">${price.toFixed(2)}/lb</span>
        </div>
        <p className="text-xs text-muted-foreground">Grown in {location}</p>
        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" size="sm" className="w-full text-green-600 hover:bg-green-50 hover:text-green-700">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
