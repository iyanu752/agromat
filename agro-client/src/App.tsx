import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import LandingPage from './pages/landingpage';
import Navbar from './comp/navbar';
import Products from './pages/products';
import Signup from './pages/signUp';
import Login from './pages/login';
import { useState, useEffect } from 'react';
// import { ToastContainer } from "react-toastify";
import FooterSection from './comp/footer';
import { Toaster} from 'sonner'
import CartPage from './pages/cart';
// import PropTypes from 'prop-types';


function AppLayout ({children}: { children: React.ReactNode }) {
  const location = useLocation();
  const [showNavbarFooter, setShowNavbarFooter] = useState(true);

  useEffect(() => {
    const hiddenRoutes = ["/signup", "/login"];
    setShowNavbarFooter(!hiddenRoutes.includes(location.pathname));
  }, [location]);

  return (
    <>
      {showNavbarFooter && <Navbar/>}
      {children}
      {showNavbarFooter && <FooterSection/>}
    </>
  )
}




function App() {
  const router = createBrowserRouter([
    {path: "/" , element: <AppLayout><LandingPage/></AppLayout>},
    {path: "/products", element:<AppLayout><Products/></AppLayout>},
    { path: "/signup", element: <div><Signup /></div> },
    {path: "/login", element: <div><Login/></div>},
    {path: "/cart", element: <div><CartPage/></div>}
  ])

  return (
    <>
    {/* <Navbar/>
    <LandingPage/>
    <Footer/> */}
    <Toaster 
     position="top-right"
     expand={true}
     richColors 
     />
    <RouterProvider router={router} />
    </>
  )
}

export default App

// AppLayout.propTypes = {
//   children: PropTypes.node,
// };