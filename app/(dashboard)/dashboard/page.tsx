"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingCart,
  CheckCircle,
  Clock,
  TruckIcon,
  DollarSign,
  AlertCircle,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { orderService } from "@/lib/api-services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { id } from "date-fns/locale"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    inDeliveryOrders: 0,
    cancelledOrders: 0,
    paidOrders: 0,
    unpaidOrders: 0,
    debtOrders: 0,
    totalRevenue: 0,
    totalDebt: 0,
    successRate: 0,
  })
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([])
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

        const filteredOrders = orders.filter((order: { createdAt: string | number | Date }) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= startDate && orderDate <= endDate
        })

        // Calculate basic stats
        const totalOrders = filteredOrders.length
        const pendingOrders = filteredOrders.filter((order: { status: string }) => order.status === "Not Yet Processed").length
        const inDeliveryOrders = filteredOrders.filter((order: { status: string }) => order.status === "Being Sent").length
        const completedOrders = filteredOrders.filter((order: { status: string }) => order.status === "Completed").length
        const cancelledOrders = filteredOrders.filter((order: { status: string }) => order.status === "Cancelled").length
        const paidOrders = filteredOrders.filter((order: { paymentStatus: string }) => order.paymentStatus === "Paid").length
        const unpaidOrders = filteredOrders.filter(
          (order: { paymentStatus: string }) => order.paymentStatus === "Not Yet Paid" || order.paymentStatus === "Pending Verification",
        ).length
        const debtOrders = filteredOrders.filter((order: { paymentStatus: string }) => order.paymentStatus === "Debt").length

        // Calculate revenue and debt
        const totalRevenue = filteredOrders
          .filter((order: { paymentStatus: string }) => order.paymentStatus === "Paid")
          .reduce((sum: any, order: { totalPrice: any }) => sum + order.totalPrice, 0)

        const totalDebt = filteredOrders
          .filter((order: { paymentStatus: string }) => order.paymentStatus === "Debt")
          .reduce((sum: any, order: { totalPrice: any }) => sum + order.totalPrice, 0)

        // Calculate success rate (completed orders / total orders)
        const successRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0

        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          inDeliveryOrders,
          cancelledOrders,
          paidOrders,
          unpaidOrders,
          debtOrders,
          totalRevenue,
          totalDebt,
          successRate,
        })

        // Calculate top products
        const productCount: Record<string, { name: string; count: number; revenue: number }> = {}
        filteredOrders.forEach((order: { products: { name: string; quantity: number; price: number }[] }) => {
          order.products.forEach((product: { name: string; quantity: number; price: number }) => {
            if (productCount[product.name]) {
              productCount[product.name].count += product.quantity
              productCount[product.name].revenue += product.price * product.quantity
            } else {
              productCount[product.name] = {
                name: product.name,
                count: product.quantity,
                revenue: product.price * product.quantity,
              }
            }
          })
        })

        const topProductsArray = Object.values(productCount)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map((product, index) => ({
            ...product,
            fill: `hsl(${index * 72}, 70%, 50%)`,
            shortName: product.name.length > 12 ? product.name.substring(0, 12) + "..." : product.name,
          }))

        setTopProducts(topProductsArray)

        // Get recent activity (last 5 orders) for the selected month
        const sortedOrders = [...filteredOrders]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 5)

        setRecentActivity(sortedOrders)

        // Calculate monthly trend (last 6 months)
        const monthlyData = []
        for (let i = 5; i >= 0; i--) {
          const monthDate = subMonths(new Date(), i)
          const monthStart = startOfMonth(monthDate)
          const monthEnd = endOfMonth(monthDate)

          const monthOrders = orders.filter((order: { createdAt: string | number | Date }) => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= monthStart && orderDate <= monthEnd
          })

          const monthRevenue = monthOrders
            .filter((order: { paymentStatus: string }) => order.paymentStatus === "Paid")
            .reduce((sum: any, order: { totalPrice: any }) => sum + order.totalPrice, 0)

          monthlyData.push({
            month: format(monthDate, "MMM", { locale: id }),
            orders: monthOrders.length,
            revenue: monthRevenue,
          })
        }

        setMonthlyTrend(monthlyData)
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
          <div className="rounded-full bg-blue-100 p-2">
            <TruckIcon className="h-4 w-4 text-blue-600" />
          </div>
        )
      case "Not Yet Processed":
        return (
          <div className="rounded-full bg-yellow-100 p-2">
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
        )
      case "Cancelled":
        return (
          <div className="rounded-full bg-red-100 p-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
          </div>
        )
      default:
        return (
          <div className="rounded-full bg-gray-100 p-2">
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </div>
        )
    }
  }

  const getActivityText = (order: any) => {
    switch (order.status) {
      case "Completed":
        return `Order #${order._id.slice(-6)} completed`
      case "Being Sent":
        return `Order #${order._id.slice(-6)} is being delivered`
      case "Not Yet Processed":
        return `New order #${order._id.slice(-6)} received`
      case "Cancelled":
        return `Order #${order._id.slice(-6)} was cancelled`
      default:
        return `Order #${order._id.slice(-6)} updated`
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
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

  // Data for order status pie chart
  const orderStatusData = [
    { name: "Completed", value: stats.completedOrders, fill: "#22c55e" },
    { name: "In Delivery", value: stats.inDeliveryOrders, fill: "#3b82f6" },
    { name: "Pending", value: stats.pendingOrders, fill: "#eab308" },
    { name: "Cancelled", value: stats.cancelledOrders, fill: "#ef4444" },
  ].filter((item) => item.value > 0)

  // Data for payment status pie chart
  const paymentStatusData = [
    { name: "Paid", value: stats.paidOrders, fill: "#22c55e" },
    { name: "Debt", value: stats.debtOrders, fill: "#f59e0b" },
    { name: "Unpaid", value: stats.unpaidOrders, fill: "#ef4444" },
  ].filter((item) => item.value > 0)

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
            <SelectTrigger className="w-[180px] border-gray-200">
              <SelectValue>{format(selectedMonth, "MMMM yyyy", { locale: id })}</SelectValue>
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

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">From paid orders</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(stats.totalDebt)}</div>
            <p className="text-xs text-muted-foreground">Outstanding payments</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Orders completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of order statuses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} orders`, "Quantity"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Distribution of payment statuses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} orders`, "Quantity"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products - Radar Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Most ordered products</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={topProducts}>
                <PolarGrid />
                <PolarAngleAxis dataKey="shortName" />
                <PolarRadiusAxis />
                <Radar name="Quantity" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip
                  formatter={(value, name, props) => {
                    const product = props.payload
                    return [`${value} units`, product.name]
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Orders and revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? formatCurrency(value as number) : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest order updates for {format(selectedMonth, "MMMM yyyy", { locale: id })}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] overflow-y-auto">
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No recent activity</p>
              ) : (
                recentActivity.map((order) => (
                  <div key={order._id} className="flex items-center gap-4 rounded-lg border p-4">
                    {getActivityIcon(order)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{getActivityText(order)}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customerName} • {formatCurrency(order.totalPrice)} • {formatTimeAgo(order.updatedAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
