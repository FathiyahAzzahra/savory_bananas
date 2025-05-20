"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, CheckCircle, Clock, TruckIcon, DollarSign, AlertCircle, Calendar } from "lucide-react"
import { orderService } from "@/lib/api-services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { id } from "date-fns/locale"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    inDeliveryOrders: 0,
    paidOrders: 0,
    unpaidOrders: 0,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())

  useEffect(() => {
    // Get user role from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      const { role } = JSON.parse(user)
      setUserRole(role)
    }

    // Fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        const orders = await orderService.getAll()

        // Filter orders for the selected month
        const startDate = startOfMonth(selectedMonth)
        const endDate = endOfMonth(selectedMonth)

        const filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= startDate && orderDate <= endDate
        })

        // Calculate stats
        const totalOrders = filteredOrders.length
        const pendingOrders = filteredOrders.filter((order) => order.status === "Not Yet Processed").length
        const inDeliveryOrders = filteredOrders.filter((order) => order.status === "Being Sent").length
        const completedOrders = filteredOrders.filter((order) => order.status === "Completed").length
        const paidOrders = filteredOrders.filter((order) => order.paymentStatus === "Paid").length
        const unpaidOrders = filteredOrders.filter((order) => order.paymentStatus === "Not Yet Paid").length

        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          inDeliveryOrders,
          paidOrders,
          unpaidOrders,
        })

        // Get recent activity (last 3 orders) for the selected month
        const sortedOrders = [...filteredOrders]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3)

        setRecentActivity(sortedOrders)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [selectedMonth])

  const getActivityIcon = (order: any) => {
    switch (order.status) {
      case "Completed":
        return (
          <div className="rounded-full bg-green-100 p-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        )
      case "Being Sent":
        return (
          <div className="rounded-full bg-secondary/20 p-2">
            <TruckIcon className="h-4 w-4 text-secondary-foreground" />
          </div>
        )
      case "Not Yet Processed":
        return (
          <div className="rounded-full bg-primary/20 p-2">
            <Clock className="h-4 w-4 text-primary" />
          </div>
        )
      default:
        return (
          <div className="rounded-full bg-muted p-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
        )
    }
  }

  const getActivityText = (order: any) => {
    switch (order.status) {
      case "Completed":
        return `Order #${order._id} completed`
      case "Being Sent":
        return `Order #${order._id} is being delivered`
      case "Not Yet Processed":
        return `New order #${order._id} received`
      default:
        return `Order #${order._id} updated`
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  // Generate last 6 months for selection
  const getMonthOptions = () => {
    const options = []
    for (let i = 0; i < 6; i++) {
      const date = subMonths(new Date(), i)
      options.push({
        value: date.toISOString(),
        label: format(date, "MMMM yyyy", { locale: id }),
      })
    }
    return options
  }

  const monthOptions = getMonthOptions()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your {userRole === "admin" ? "business" : "tasks"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedMonth.toISOString()} onValueChange={(value) => setSelectedMonth(new Date(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="orders" className="font-medium">
            Orders
          </TabsTrigger>
          <TabsTrigger value="payments" className="font-medium">
            Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">{format(selectedMonth, "MMMM yyyy", { locale: id })}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Waiting to be processed</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Delivery</CardTitle>
                <TruckIcon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.inDeliveryOrders}</div>
                <p className="text-xs text-muted-foreground">Currently being delivered</p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3 border-primary/20">
              <CardHeader className="border-b">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent order processing activity for {format(selectedMonth, "MMMM yyyy", { locale: id })}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentActivity.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No recent activity</p>
                  ) : (
                    recentActivity.map((order) => (
                      <div key={order._id} className="flex items-center gap-4 rounded-lg border p-4">
                        {getActivityIcon(order)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{getActivityText(order)}</p>
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(order.updatedAt)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Orders</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.paidOrders}</div>
                <p className="text-xs text-muted-foreground">{format(selectedMonth, "MMMM yyyy", { locale: id })}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unpaid Orders</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.unpaidOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting payment</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalOrders > 0 ? Math.round((stats.paidOrders / stats.totalOrders) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">Of orders are paid</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
