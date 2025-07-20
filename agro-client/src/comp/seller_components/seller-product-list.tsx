"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Package } from "lucide-react"
import { deleteProduct } from "@/services/productService"
import ProductUploadModal from "./product-upload"
import { toast } from "sonner"

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  location: string;
  unit: string
  image: string[];
  sold: number
  status: string
  harvestDate: string;
  quantity: number
  expiryDate: string;
  method: string;
}

interface SellerProductListProps {
  products: Product[];
  onProductUpdated: () => void;
}

export default function SellerProductList({ products, onProductUpdated }: SellerProductListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/-/g, " ").trim()

    switch (normalizedStatus) {
      case "in stock":
        return "bg-green-100 text-green-800"
      case "out of stock":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try{
      const deletedProduct = await deleteProduct(productId)
      if( deletedProduct){
        toast.success('Product deleted successfully')
        onProductUpdated() // Call parent's update function
        return deletedProduct
      }else{
        toast.error('Failed to delete product')
      }
    }catch(error) {
      console.error('Error deleting product', error)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsEditing(true)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setIsEditing(false)
  }

  const handleProductUpdated = () => {
    onProductUpdated() // Call parent's update function
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            My Products
          </CardTitle>
          <CardDescription>Manage your product listings and track their performance.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-md border">
                          {product.image && product.image.length > 0 && (
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-[120px]">
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      ${product.price.toFixed(2)}/{product.unit}
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(product.status)}>
                        {product.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product._id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
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

      <ProductUploadModal
        open={isModalOpen}
        onClose={handleModalClose}
        onProductAdded={handleProductUpdated}
        editProduct={editingProduct}
        isEditing={isEditing}
      />
    </>
  )
}