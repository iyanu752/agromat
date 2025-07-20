import { Button } from "@/components/ui/button"
import {ArrowRight, ChevronRight} from "lucide-react"
import LandingAnimation from "./landingAnimation"
import FeatureCard from "./featureCard"
import ProductCard from "./productCard"
import NewsletterForm from "./newsletterForm"
import { getAllProducts } from "@/services/productService"
import { addToCart } from "@/services/cartService" 
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Product {
  _id: string
  name: string
  price: number
  image: string[]
  unit: string
  category: string
}

function Hero () {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts()
        setProducts(res)
      } catch (error) {
        console.error("Failed to fetch products", error)
      }
    }

    fetchProducts()
  }, [])

const handleAddToCart = async (productId: string) => {
  console.log("handleAddToCart triggered for:", productId); 

  const userId = localStorage.getItem("userId");
  if (!userId) {
    toast.error("You must be logged in to add items to your cart.");
    return;
  }

  const payload = { userId, productId, quantity: 1 };

  try {
    const result = await addToCart(payload);
    if (result.success) {
      toast.success(result.message || "Added to cart successfully!");
    } else {
      toast.error(result.message || "Failed to add to cart.");
    }
  } catch (error) {
    toast.error("Something went wrong while adding to cart.");
    console.error(error);
  }
};

  
    return (
        <>
            <section className="relative  overflow-hidden p-[32px] bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
          <div className="container grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative z-10 space-y-6">
              <div className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                Sustainable Agriculture
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-green-900 md:text-5xl lg:text-6xl">
                Grow Your Wealth With Agriculture
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground">
                An innovative agricultural investment platform designed to empower individuals and businesses to profit
                from agriculture without traditional farming hassles.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Investing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href="/products"><Button variant="outline">Explore Products</Button></a>
              </div>
            </div>
            <div className="relative md:block">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <LandingAnimation/>
              </div>
              <div className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full bg-green-200/50 blur-3xl"></div>
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-yellow-200/50 blur-3xl"></div>
            </div>
          </div>
          <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-green-100/80 blur-3xl"></div>
        </section>


        <section className="py-16 md:py-24 p-[32px]">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-green-900 md:text-4xl">Why Choose AgroMat</h2>
              <p className="mt-4 max-w-[700px] mx-auto text-lg text-muted-foreground">
                We bridge the gap between landowners, investors, and farmers, creating a seamless ecosystem for
                sustainable and profitable agribusiness.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon="leaf"
                title="Land Leasing for Farmers"
                description="Start your agricultural business by leasing lands from landowners and submit your crop leasing proposals."
              />
              <FeatureCard
                icon="seedling"
                title="Crop Investment"
                description="Investors can sponsor farms, purchase seeds, and earn high returns from successful harvests."
              />
              <FeatureCard
                icon="shopping-basket"
                title="Farm Product Purchase"
                description="Access fresh, high-quality farm produce directly from AgroMat's network of farmers."
              />
              <FeatureCard
                icon="chart-line"
                title="Advanced Tools"
                description="Get advanced tech and marketing tools, scaling your business higher with data-driven insights."
              />
              <FeatureCard
                icon="shield-check"
                title="Guaranteed Profitability"
                description="Whether leasing land, investing in crops, or purchasing farm products, enjoy a secure experience."
              />
              <FeatureCard
                icon="users"
                title="Community Support"
                description="Join a thriving community of farmers, investors, and agricultural enthusiasts."
              />
            </div>
          </div>
        </section>



        <section className="bg-green-50 py-16 md:py-24 p-[32px]">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-green-900">Fresh Produce</h2>
              <a href="/products" className="flex items-center text-green-600 hover:text-green-700">
                View all products
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...products]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 4)
                  .map((product) => (
                   <ProductCard
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    location={product.category}
                    imageUrl={
                      product.image && product.image.length > 0
                        ? product.image[0]
                        : "/placeholder.svg?height=400&width=400"
                    }
                    onAddToCart={() => handleAddToCart(product._id)}
                  />
                ))}
              </div>
          </div>
        </section>

        <section className="bg-green-800 py-16 p-[32px] text-white md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to transform agriculture into a smart investment?
                </h2>
                <p className="mt-4 text-green-100">
                  At AGROMAT, we redefine agriculture as a smart investment, unlocking sustainable wealth while ensuring
                  food security and economic growth.
                </p>
                <div className="mt-8">
                  <Button className="bg-white text-green-800 hover:bg-green-100">Join us today</Button>
                </div>
              </div>
              <div className="rounded-lg bg-green-700 p-8">
                <h3 className="mb-4 text-xl font-semibold">Get Started Today</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                      <span className="text-xs">1</span>
                    </div>
                    <p>Create your free account and explore investment opportunities</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                      <span className="text-xs">2</span>
                    </div>
                    <p>Choose from various agricultural projects to invest in</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                      <span className="text-xs">3</span>
                    </div>
                    <p>Track your investments and watch your returns grow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 p-[32px] md:py-24">
          <div className="container">
            <div className="mx-auto max-w-[600px] text-center">
              <h2 className="text-3xl font-bold tracking-tight text-green-900">Stay Updated</h2>
              <p className="mt-4 text-muted-foreground">
                Subscribe to our newsletter for the latest updates on agricultural investments, market trends, and
                exclusive offers.
              </p>
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
        </>
    )
}

export default Hero