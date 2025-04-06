import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,

  } from "@/components/ui/navigation-menu"
  import Agromatlogo from "../assets/AgroMat.svg"

  function Navbar() {
    return (
        <div className="flex flex-row justify-between items-center ">
            <div>
                <img src={Agromatlogo} alt=" agromat logo" className="w-[100px]" />
            </div>
            
            
                <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="flex flex-row items-center">
                    <NavigationMenuLink>Link</NavigationMenuLink>
                    <NavigationMenuLink>Signup</NavigationMenuLink>
                    <NavigationMenuLink>Login</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>

        </div>
    )
  }

  export default Navbar