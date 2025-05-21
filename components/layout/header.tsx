"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface HeaderProps {
  onLogout: () => void
  user?: Session["user"]
}

export function Header({ onLogout, user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-primary text-primary-foreground shadow-md">
      <div className="w-full max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between py-4">

        {/* Kiri - Menu untuk mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <Sidebar onLogout={onLogout} user={user} className="border-none" />
            </SheetContent>
          </Sheet>
        </div>

        {/* Tengah - Title */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <h1 className="text-xl font-bold text-primary-foreground">Management System</h1>
        </div>

        {/* Kanan - Notification dan User */}
        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-primary-foreground hover:bg-primary/80">
                <span className="hidden md:inline-block">{user?.username || user?.name}</span>
                <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground grid place-items-center font-bold">
                  {(user?.name || user?.username || "U").charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="capitalize">Role: {user?.role}</DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
