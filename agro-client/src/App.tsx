import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import LandingPage from './pages/landingpage';
import Navbar from './comp/navbar';
import Products from './pages/products';
import Signup from './pages/signUp';
import Login from './pages/login';
import { useState, useEffect } from 'react';
import FooterSection from './comp/footer';
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
    {path: "/login", element: <div><Login/></div>}
  ])

  return (
    <>
    {/* <Navbar/>
    <LandingPage/>
    <Footer/> */}
    <RouterProvider router={router} />
    </>
  )
}

export default App

// AppLayout.propTypes = {
//   children: PropTypes.node,
// };