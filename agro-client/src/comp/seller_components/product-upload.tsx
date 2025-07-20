import React, { useState, useEffect } from "react"
import { X, Image } from "lucide-react"
import { createProducts, updateProduct, getProductsBySellerId} from "@/services/productService"
import { toast } from "sonner";

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

interface ProductFormValues {
  name: string
  category: string
  description: string
  price: number
  unit: string
  quantity: number
  location: string
  method: string
  harvestDate: string
  expiryDate: string
}

interface ProductUploadModalProps {
  open: boolean
  onClose: () => void
  onProductAdded?: () => void
  editProduct?: Product | null // New prop for editing
  isEditing?: boolean // New prop to determine mode
}

interface FormErrors {
  [key: string]: string
}

export default function ProductUploadModal({ 
  open, 
  onClose, 
  onProductAdded, 
  editProduct = null, 
  isEditing = false 
}: ProductUploadModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState<ProductFormValues>({
    name: "",
    category: "",
    description: "",
    price: 0,
    unit: "",
    quantity: 0,
    location: "",
    method: "",
    harvestDate: "",
    expiryDate: "",
  })

  // Populate form with existing product data when editing
  useEffect(() => {
    if (isEditing && editProduct) {
      setFormData({
        name: editProduct.name,
        category: editProduct.category,
        description: editProduct.description,
        price: editProduct.price,
        unit: editProduct.unit,
        quantity: editProduct.quantity,
        location: editProduct.location,
        method: editProduct.method,
        harvestDate: editProduct.harvestDate,
        expiryDate: editProduct.expiryDate,
      })
      setUploadedImages(editProduct.image || [])
    } else {
      // Reset form for new product
      resetForm()
    }
  }, [isEditing, editProduct, open])

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) errors.name = "Product name is required"
    if (!formData.category) errors.category = "Category is required"
    if (!formData.description.trim()) errors.description = "Description is required"
    if (!formData.price || formData.price <= 0) errors.price = "Price must be greater than 0"
    if (!formData.unit) errors.unit = "Unit is required"
    if (!formData.quantity || formData.quantity <= 0) errors.quantity = "Quantity must be greater than 0"
    if (!formData.location.trim()) errors.location = "Farm location is required"
    if (!formData.method) errors.farmingMethod = "Farming method is required"
    if (!formData.harvestDate) errors.harvestDate = "Harvest date is required"
    if (!formData.expiryDate) errors.expiryDate = "Best before date is required"

    if (formData.harvestDate && formData.expiryDate) {
      const harvestDate = new Date(formData.harvestDate)
      const expiryDate = new Date(formData.expiryDate)
      if (harvestDate >= expiryDate) {
        errors.expiryDate = "Best before date must be after harvest date"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof ProductFormValues, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

   const getProducts = async () => {
    try {
      const sellerId = localStorage.getItem("userId")
      if(!sellerId){
        return
      }
      const response = await getProductsBySellerId(sellerId)
      if (response) {
        setProducts(response)
        console.log(products)
      }
    }catch (error) {
      console.error ('Error fetching products', error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        unit: formData.unit,
        location: formData.location,
        quantity: formData.quantity, 
        image: uploadedImages,     
        harvestDate: formData.harvestDate,
        expiryDate: formData.expiryDate,
        method: formData.method,
      };

      if (isEditing && editProduct) {
        const update = await updateProduct(editProduct._id, productData);
        if (update) {
           toast.success("Product updated successfully")
        }else {
          toast.error("Failed to update product")
        }
       
      } else {
        const create = await createProducts(productData);
        if(!create) {
          toast.error("Failed to create product")
        }
      }
      getProducts();
      resetForm();
      onClose();
      onProductAdded?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("API error:", err);
      setError(err?.message || `Failed to ${isEditing ? 'update' : 'upload'} product. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: 0,
      unit: "",
      quantity: 0,
      location: "",
      method: "",
      harvestDate: "",
      expiryDate: "",
    })
    setUploadedImages([])
    setFormErrors({})
    setError(null)
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      resetForm()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing 
              ? 'Update the details of your product.' 
              : 'Fill in the details about your product to list it for sale.'
            }
          </p>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Images (Max 5)</label>
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 h-6 w-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {uploadedImages.length < 5 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadedImages.length >= 5}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Organic Heirloom Tomatoes"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select category</option>
                  <option value="fruits-vegetables">Fruits & Vegetables</option>
                  <option value="grains-cereals">Grains & Cereals</option>
                  <option value="dairy-eggs">Dairy & Eggs</option>
                  <option value="meat-poultry">Meat & Poultry</option>
                  <option value="herbs-spices">Herbs & Spices</option>
                </select>
                {formErrors.category && <p className="text-sm text-red-500">{formErrors.category}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                placeholder="Describe your product..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price || ""}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select unit</option>
                  <option value="lb">per lb</option>
                  <option value="kg">per kg</option>
                  <option value="piece">per piece</option>
                  <option value="dozen">per dozen</option>
                  <option value="bunch">per bunch</option>
                </select>
                {formErrors.unit && <p className="text-sm text-red-500">{formErrors.unit}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Available Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  value={formData.quantity || ""}
                  onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.quantity && <p className="text-sm text-red-500">{formErrors.quantity}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Farm Location</label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g., Salinas Valley, CA"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.location && <p className="text-sm text-red-500">{formErrors.location}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="farmingMethod" className="block text-sm font-medium text-gray-700">Farming Method</label>
                <select
                  id="farmingMethod"
                  value={formData.method}
                  onChange={(e) => handleInputChange("method", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select method</option>
                  <option value="organic">Organic</option>
                  <option value="conventional">Conventional</option>
                  <option value="hydroponic">Hydroponic</option>
                  <option value="biodynamic">Biodynamic</option>
                </select>
                {formErrors.farmingMethod && <p className="text-sm text-red-500">{formErrors.farmingMethod}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">Harvest Date</label>
                <input
                  id="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.harvestDate && <p className="text-sm text-red-500">{formErrors.harvestDate}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Best Before Date</label>
                <input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {formErrors.expiryDate && <p className="text-sm text-red-500">{formErrors.expiryDate}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {isLoading ? 
                  (isEditing ? "Updating Product..." : "Adding Product...") : 
                  (isEditing ? "Update Product" : "Add Product")
                }
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}