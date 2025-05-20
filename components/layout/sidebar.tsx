"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingCart, Package, BarChart, Users, LogOut } from "lucide-react"
import type { Session } from "next-auth"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onLogout: () => void
  user?: Session["user"]
}

export function Sidebar({ className, onLogout, user, ...props }: SidebarProps) {
  const pathname = usePathname()
  const userRole = user?.role

  const isAdmin = userRole === "admin"
  const isOwner = userRole === "owner"

  return (
    <div className={cn("pb-12 border-r z-50 h-screen bg-muted", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="rounded-full w-16 h-16 flex items-center justify-center">
              <img src="/logo_SavoryBananas.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <h2 className="text-lg font-bold">SavoryBananas</h2>
          </div>

          <div className="space-y-1">
            <Link href="/dashboard" passHref>
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start font-medium"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/orders" passHref>
              <Button
                variant={pathname.includes("/orders") ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start font-medium"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </Link>
            {(isAdmin || isOwner) && (
              <Link href="/stock" passHref>
                <Button
                  variant={pathname.includes("/stock") ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start font-medium"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Stock
                </Button>
              </Link>
            )}
            {(isAdmin || isOwner) && (
              <Link href="/reports" passHref>
                <Button
                  variant={pathname.includes("/reports") ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start font-medium"
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </Link>
            )}
            {isOwner && (
              <Link href="/users" passHref>
                <Button
                  variant={pathname.includes("/users") ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start font-medium"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight">Account</h2>
          <Button variant="ghost" size="sm" className="w-full justify-start font-medium" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
