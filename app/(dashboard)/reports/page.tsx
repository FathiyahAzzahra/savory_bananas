"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"
import { id } from "date-fns/locale"
import { reportService, orderService } from "@/lib/api-services"
import { useToast } from "@/components/ui/use-toast"
import type { SalesReport, Order } from "@/lib/types"
import { useSession } from "next-auth/react"

export default function ReportsPage() {
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [reports, setReports] = useState<SalesReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [monthlyOrders, setMonthlyOrders] = useState<Order[]>([])
  const { toast } = useToast()
  const { data: session } = useSession()

  const userRole = session?.user?.role


  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true)
        const data = await reportService.getMonthlySales(year)

        const parsedReports = data.map((r) => ({
          ...r,
          totalSales: Number(r.totalSales),
          totalOrders: Number(r.totalOrders),
          averageOrderValue: Number(r.averageOrderValue), // opsional, bisa dihitung manual
        }))

        setReports(parsedReports)

      } catch (error) {
        console.error("Failed to fetch reports:", error)
        toast({
          title: "Error",
          description: "Failed to load reports. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [year, toast])

  useEffect(() => {
    const fetchMonthlyOrders = async () => {
      try {
        setIsLoading(true)
        const orders = await orderService.getAll()

        const startDate = startOfMonth(selectedMonth)
        const endDate = endOfMonth(selectedMonth)

        const filteredOrders = orders
          .filter((order) => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= startDate && orderDate <= endDate
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setMonthlyOrders(filteredOrders)
      } catch (error) {
        console.error("Failed to fetch monthly orders:", error)
        toast({
          title: "Error",
          description: "Failed to load monthly orders. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMonthlyOrders()
  }, [selectedMonth, toast])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd MMMM yyyy", { locale: id })
  }

  const totalSales = reports.reduce((sum, r) => sum + r.totalSales, 0)
  const totalOrders = reports.reduce((sum, r) => sum + r.totalOrders, 0)
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Not Yet Processed":
        return (
          <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary font-medium">
            Not Yet Processed
          </Badge>
        )
      case "Being Sent":
        return (
          <Badge variant="outline" className="bg-primary/20 text-primary border-primary font-medium">
            Being Sent
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="font-medium">
            {status}
          </Badge>
        )
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
            Paid
          </Badge>
        )
      case "Not Yet Paid":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-medium">
            Not Yet Paid
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="font-medium">
            {status}
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading reports data...</p>
      </div>
    )
  }

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value).replace(/\u00A0/g, " ")
  }

  const handleExport = () => {
    // Kita bikin data CSV untuk sales report + order history bulan ini

    // Format bulan untuk cari data report
    const monthStr = format(selectedMonth, "MMMM yyyy", { locale: id })
    const monthNameEn = format(selectedMonth, "LLLL")

    // Cari report bulan ini dari reports
    const report = reports.find(r => r.month === monthNameEn)

    if (!report) {
      toast({
        title: "Error",
        description: 'Data laporan untuk bulan ${monthStr}  ini tidak ditemukan.',
        variant: "destructive",
      })
      return
    }

    // Header CSV sales report
    const salesReportCsv = [
      ["Laporan Penjualan Bulan", monthStr],
      [],
      ["Total Sales", "Total Orders", "Average Order Value"],
      [formatRupiah(report.totalSales),
      report.totalOrders.toString(),
      report.totalOrders > 0
        ? formatRupiah(report.totalSales / report.totalOrders)
        : "Rp 0,00",],
    ]

    // Header CSV order history
    const ordersCsv = [
      [],
      ["Riwayat Pesanan"],
      ["Order ID", "Customer", "Date", "Status", "Payment Status", "Total Price"],
    ]

    // Data order history
    monthlyOrders.forEach(order => {
      ordersCsv.push([
        order._id,
        order.customerName,
        formatDate(order.createdAt),
        order.status,
        order.paymentStatus,
        formatRupiah(order.totalPrice),
      ])
    })

    // Gabungkan data CSV jadi satu array
    const csvData = [...salesReportCsv, ...ordersCsv]

    // Convert array ke string CSV
    const csvContent = csvData.map(row => row.join(";")).join("\n")

    // Buat blob dan link download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `laporan-${format(selectedMonth, "yyyy-MM")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Reports</h2>
          <p className="text-muted-foreground">View and analyze your sales performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={selectedMonth.toISOString()}
            onValueChange={(value) => setSelectedMonth(new Date(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {format(selectedMonth, "MMMM yyyy", { locale: id })}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {userRole === "owner" && (
            <button
              type="button"
              onClick={handleExport}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 z-10"
            >
              Export Laporan
            </button>
          )}



        </div>

      </div>

      <Tabs defaultValue="monthly-orders" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="monthly-orders" className="font-medium">
            Monthly Orders
          </TabsTrigger>
          <TabsTrigger value="charts" className="font-medium">
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Orders for {format(selectedMonth, "MMMM yyyy", { locale: id })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No orders found for this month
                        </TableCell>
                      </TableRow>
                    ) : (
                      monthlyOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell className="font-medium">#{order._id}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                          <TableCell className="text-right">{formatPrice(order.totalPrice)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {monthlyOrders.length > 0 && (
                <div className="mt-4 flex justify-between items-center p-4 bg-muted rounded-md">
                  <div>
                    <p className="text-sm font-medium">Total Orders: {monthlyOrders.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Total Value: {formatPrice(monthlyOrders.reduce((sum, order) => sum + order.totalPrice, 0))}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
                <p className="text-xs text-muted-foreground">For the year {year}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">For the year {year}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(averageOrderValue)}</div>
                <p className="text-xs text-muted-foreground">For the year {year}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>Sales performance by month for {year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={reports}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatPrice(Number(value))}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="totalSales" fill="#3b82f6" name="Total Sales" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Orders</CardTitle>
              <CardDescription>Order volume by month for {year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={reports}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => Number(value)} labelFormatter={(label) => `Month: ${label}`} />
                    <Bar dataKey="totalOrders" fill="#10b981" name="Total Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

}