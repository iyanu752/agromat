import { Menu, X, Search, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartPreview from "./cart_components/cartcomp";
import { fetchCart } from "@/services/cartService";
import ProfileMenu from "./landingpage_components/profileMenu";
function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedIn, setLoggedIN] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";
  }, [mobileMenu]);

  useEffect(() => {
    checkLogStatus();
  }, []);

  const fetchCartLength = async () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user || !user._id) return;

    try {
      const cart = await fetchCart(user._id);
      setCartLength(cart?.items?.length || 0);
    } catch (e) {
      console.error("Failed to fetch cart", e);
      setCartLength(0);
    }
  };

  useEffect(() => {
    checkLogStatus();
    fetchCartLength();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchCartLength();
    }
  }, [loggedIn]);

  const checkLogStatus = () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      setLoggedIN(user?.userLoggedIn === true);
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      setLoggedIN(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-[24px]">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800">AgroMat</span>
          </a>
        </div>

        <div className="hidden md:flex md:w-80">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </a>
            <a
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Products
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Invest
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="/login"
              className={` ${
                loggedIn ? "hidden" : "flex"
              } text-sm font-medium text-muted-foreground hover:text-foreground`}
            >
              Log in
            </a>
            <Button
              asChild
              variant="default"
              className={`${
                loggedIn ? "hidden" : "flex"
              } bg-green-600 hover:bg-green-700`}
            >
              <a href="/signup">Sign up</a>
            </Button>
            <ProfileMenu />
          </nav>
          <div className="flex lg:hidden items-center gap-2">
            {loggedIn && <ProfileMenu />}
          </div>
          <Button variant="outline" size="icon" className="relative">
            <CartPreview />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
              {cartLength}
            </span>
          </Button>
          <button className="lg:hidden" onClick={toggleMobileMenu}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] flex h-screen flex-col bg-white backdrop-blur-lg px-6 py-10 lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={toggleMobileMenu} className="text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 bg-white p-[32px] mt-10 text-center">
              {/* {loggedIn && (
                <div className="flex justify-center">
                  <ProfileMenu />
                </div>
              )} */}
              <a
                href="/"
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
                onClick={toggleMobileMenu}
              >
                Home
              </a>
              <a
                href="#"
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
                onClick={toggleMobileMenu}
              >
                Products
              </a>
              <a
                href="#"
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
                onClick={toggleMobileMenu}
              >
                Invest
              </a>
              <a
                href="#"
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
                onClick={toggleMobileMenu}
              >
                About
              </a>
              {!loggedIn && (
                <>
                  <a
                    href="/login"
                    className="text-lg font-medium text-muted-foreground hover:text-foreground"
                    onClick={toggleMobileMenu}
                  >
                    Log in
                  </a>
                  <Button
                    asChild
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <a href="/signup" onClick={toggleMobileMenu}>
                      Sign up
                    </a>
                  </Button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
