"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Package, LogOut, Store, Lock } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

export default function ProfileMenu() {
  // This would come from your auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Mock user data - in a real app, this would come from your auth provider
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "/placeholder.svg",
    initials: "JS",
    isSeller: true, // This would determine if user has seller access
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-8 w-8 items-center justify-center rounded-full border bg-muted text-sm ring-offset-background transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <a href="/profile" className="w-full">
              My Profile
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Package className="mr-2 h-4 w-4" />
            <a href="/orders/:id" className="w-full">
              My Orders
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center w-full">
              <Lock className="mr-2 h-4 w-4" />
              <a href="/investments" className="w-full">
                My Investments
              </a>
            </div>
          </DropdownMenuItem>
          {user.isSeller && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Store className="mr-2 h-4 w-4" />
                <a href="/seller/dashboard" className="w-full">
                  Seller Dashboard
                </a>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <a href="/settings" className="w-full">
            Settings
          </a>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:bg-red-50 focus:text-red-600"
          onClick={() => setIsLoggedIn(false)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
