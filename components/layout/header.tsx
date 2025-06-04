"use client"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import type { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface HeaderProps {
  onLogout: () => void
  user?: Session["user"]
}

export function Header({ onLogout, user }: HeaderProps) {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (user && 'profileImageUrl' in user && typeof user.profileImageUrl === 'string') {
      setProfileImage(`${user.profileImageUrl}?t=${Date.now()}`)
    } else {
      setProfileImage(undefined)
    }
  }, [user])


  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Left: Menu (mobile) */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/70 transition-colors duration-200 cursor-pointer"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <Sidebar onLogout={onLogout} user={user} className="border-none" />
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: Title (desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <h1 className="text-2xl font-semibold tracking-wide text-primary-foreground">
            Order Management System
          </h1>
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-3 justify-end min-w-[150px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-primary-foreground hover:bg-primary/70 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {/* Username hanya tampil di md ke atas */}
                <span className="hidden md:inline-block font-medium truncate max-w-[150px]">
                  {user?.username || user?.name}
                </span>

                {/* Avatar tidak boleh mengecil */}
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarImage
                    src={profileImage || "/placeholder.svg"}
                    alt={user?.name || user?.username || "User"}
                  />
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                    {user?.name
                      ? getInitials(user.name)
                      : user?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="capitalize cursor-default" disabled>
                Role: {user?.role}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>


  )
}
