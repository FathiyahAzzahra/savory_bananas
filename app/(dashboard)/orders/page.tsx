"use client"


import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Eye, CreditCard } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"
import { PaymentProofViewer } from "@/components/payment-proof-viewer"
import { DebtPaymentForm } from "@/components/debt-payment-form"
import { CancelOrderDialog } from "@/components/cancel-order-dialog"
import { RejectPaymentDialog } from "@/components/reject-payment-dialog"
import type { Order } from "@/lib/types"
import { format } from "date-fns"
import { id } from "date-fns/locale"


export default function OrdersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  // New states for month and year filters
  const currentMonth = format(new Date(), "MM")
  const currentYear = format(new Date(), "yyyy")
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  // Dialog states
  const [selectedProofUrl, setSelectedProofUrl] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [isProofViewerOpen, setIsProofViewerOpen] = useState(false)
  const [isDebtPaymentOpen, setIsDebtPaymentOpen] = useState(false)
  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState(false)
  const [isRejectPaymentOpen, setIsRejectPaymentOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const userRole = session?.user?.role

  // Fetch orders based on selected month and year
  useEffect(() => {
    fetchOrders(selectedYear, selectedMonth)
  }, [selectedYear, selectedMonth, toast])

  const fetchOrders = async (year: string, month: string) => {
    try {
      setIsLoading(true)
      const data = await orderService.getAll(year, month)
      setOrders(data)
      setFilteredOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Client-side filtering for search, status, and payment status
  useEffect(() => {
    let result = orders

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order._id.toString().includes(searchTerm),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    if (paymentFilter !== "all") {
      result = result.filter((order) => order.paymentStatus === paymentFilter)
    }

    setFilteredOrders(result)
  }, [searchTerm, statusFilter, paymentFilter, orders])

  const openUploadDialog = (orderId: string) => {
    setSelectedOrderId(orderId)
    setIsDialogOpen(true)
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedOrderId) return
  
    try {
      // Contoh upload file ke API (ganti sesuai implementasi backend)
      await orderService.uploadCompletionProof(selectedOrderId, file)
  
      toast({
        title: "Upload success",
        description: "Completion proof uploaded successfully.",
      })
  
      // Refresh data order setelah upload, misal fetch ulang orders
      const data = await orderService.getAll()
      setOrders(data)
      setFilteredOrders(data)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload completion proof. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDialogOpen(false)
      setSelectedOrderId(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

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
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-medium">
            Cancelled
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

  const handleViewPaymentProof = (imageUrl: string, orderId: string) => {
    setSelectedProofUrl(imageUrl)
    setSelectedOrderId(orderId || "")
    setIsProofViewerOpen(true)
  }

  const handleDebtPayment = (order: Order) => {
    // Check if order is cancelled
    if (order.status === "Cancelled") {
      toast({
        title: "Cannot pay debt",
        description: "This order has been cancelled and cannot be paid.",
        variant: "destructive",
      })
      return
    }

    setSelectedOrderId(order._id)
    setIsDebtPaymentOpen(true)
  }

  const handleCancelOrder = (order: Order) => {
    // Check if order is already cancelled
    if (order.status === "Cancelled") {
      toast({
        title: "Cannot cancel order",
        description: "This order is already cancelled.",
        variant: "destructive",
      })
      return
    }

    // Check if order is being sent
    if (order.status === "Being Sent") {
      toast({
        title: "Cannot cancel order",
        description: "Orders that are being sent cannot be cancelled.",
        variant: "destructive",
      })
      return
    }

    // Check if order is completed
    if (order.status === "Completed") {
      toast({
        title: "Cannot cancel order",
        description: "Completed orders cannot be cancelled.",
        variant: "destructive",
      })
      return
    }

    // Check if order is already paid
    if (order.paymentStatus === "Paid") {
      toast({
        title: "Cannot cancel order",
        description: "Paid orders cannot be cancelled.",
        variant: "destructive",
      })
      return
    }

    // Check if payment is pending verification
    if (order.paymentStatus === "Pending Verification") {
      toast({
        title: "Cannot cancel order",
        description:
          "Orders with pending payment verification cannot be cancelled. Please approve or reject the payment first.",
        variant: "destructive",
      })
      return
    }

    // Only allow cancelling debt orders with "Not Yet Processed" status
    if (order.paymentStatus !== "Debt" || order.status !== "Not Yet Processed") {
      toast({
        title: "Cannot cancel order",
        description: "Orders can only be cancelled when status is 'Not Yet Processed' and payment status is 'Debt'.",
        variant: "destructive",
      })
      return
    }

    setSelectedOrder(order)
    setSelectedOrderId(order._id)
    setIsCancelOrderOpen(true)
  }

  const handleRejectPayment = (orderId: string) => {
    setSelectedOrderId(orderId)
    setIsRejectPaymentOpen(true)
  }

  const getPaymentBadge = (status: string, paymentProofUrl?: string, receiptUrl?: string, orderId?: string) => {
    const hasProof = paymentProofUrl || receiptUrl

    switch (status) {
      case "Paid":
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300 font-medium cursor-pointer hover:bg-green-200"
              onClick={() => hasProof && handleViewPaymentProof(paymentProofUrl || receiptUrl || "", orderId || "")}
            >
              Paid
            </Badge>
            {hasProof && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleViewPaymentProof(paymentProofUrl || receiptUrl || "", orderId || "")}
              >
                <Eye className="h-3 w-3" />
              </Button>
            )}
          </div>
        )
      case "Debt":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-medium">
              Debt
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const order = orders.find((o) => o._id === orderId)
                if (order) handleDebtPayment(order)
              }}
            >
              <CreditCard className="h-3 w-3" />
            </Button>
          </div>
        )
      case "Pending Verification":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium">
              Pending Verification
            </Badge>
            {paymentProofUrl && (
              <Button size="sm" variant="ghost" onClick={() => handleViewPaymentProof(paymentProofUrl, orderId || "")}>
                <Eye className="h-3 w-3" />
              </Button>
            )}
          </div>
        )
      case "Payment Rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-medium">
            Payment Rejected
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 font-medium">
            Cancelled
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

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await orderService.updateStatus(orderId, status)

      // Re-fetch orders to ensure data consistency after status update
      fetchOrders(selectedYear, selectedMonth)

      toast({
        title: "Status updated",
        description: `Order #${orderId} status updated to ${status}`,
      })
    } catch (error) {
      console.error("Failed to update order status:", error)
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      await orderService.updatePaymentStatus(orderId, paymentStatus)

      // Re-fetch orders to ensure data consistency after payment status update
      fetchOrders(selectedYear, selectedMonth)

      toast({
        title: "Payment status updated",
        description: `Order #${orderId} payment status updated to ${paymentStatus}`,
      })
    } catch (error) {
      console.error("Failed to update payment status:", error)
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return
    }

    try {
      await orderService.delete(orderId)

      // Re-fetch orders to ensure data consistency after deletion
      fetchOrders(selectedYear, selectedMonth)

      toast({
        title: "Order deleted",
        description: `Order #${orderId} has been deleted`,
      })
    } catch (error) {
      console.error("Failed to delete order:", error)
      toast({
        title: "Error",
        description: "Failed to delete order. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Generate month options for the select input
  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = new Date(2000, i, 1)
      return {
        value: (i + 1).toString().padStart(2, "0"),
        label: format(monthDate, "MMMM", { locale: id }),
      }
    })
  }, [])

  // Generate year options for the select input (e.g., current year and past 2 years)
  const yearOptions = useMemo(() => {
    const currentYearNum = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 3; i++) {
      // Current year and past 2 years
      years.push((currentYearNum - i).toString())
    }
    return years
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        {(userRole === "admin" || userRole === "owner") && (
          <Button onClick={() => router.push("/orders/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name or order ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* New Month Filter */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* New Year Filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Not Yet Processed">Not Yet Processed</SelectItem>
                <SelectItem value="Being Sent">Being Sent</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Debt">Debt</SelectItem>
                <SelectItem value="Pending Verification">Pending Verification</SelectItem>
                <SelectItem value="Payment Rejected">Payment Rejected</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Payment Proof</TableHead>
                  <TableHead>Completion Proof</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        <button
                          onClick={() => router.push(`/orders/${order._id}`)}
                          className="text-primary underline hover:opacity-80 transition"
                        >
                          #{order._id.slice(-8)}
                        </button>
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>

                      <TableCell>
                        {getPaymentBadge(order.paymentStatus, order.paymentProofUrl, order.receiptUrl, order._id)}
                      </TableCell>

                      <TableCell className="text-right">{formatPrice(order.totalPrice)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/orders/${order._id}`)}>
                              View Details
                            </DropdownMenuItem>

                            {order.status !== "Cancelled" && (
                              <>
                                {userRole === "admin" && (
                                  <>
                                    <DropdownMenuItem onClick={() => router.push(`/orders/${order._id}/edit`)}>
                                      Edit Order
                                    </DropdownMenuItem>

                                    {order.paymentStatus === "Pending Verification" && (
                                      <>
                                        <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(order._id, "Paid")}>
                                          Approve Payment
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRejectPayment(order._id)}>
                                          Reject Payment
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                  </>
                                )}

                                {(userRole === "admin" || userRole === "owner") && (
                                  <>
                                    {order.status === "Not Yet Processed" && (
                                      <DropdownMenuItem
                                        onClick={() => handleUpdateOrderStatus(order._id, "Being Sent")}
                                      >
                                        Mark as Being Sent
                                      </DropdownMenuItem>
                                    )}
                                    {order.status === "Being Sent" && (
                                      <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order._id, "Completed")}>
                                        Mark as Completed
                                      </DropdownMenuItem>
                                    )}
                                    {order.paymentStatus === "Pending Verification" && (
                                      <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(order._id, "Paid")}>
                                        Mark as Paid
                                      </DropdownMenuItem>
                                    )}
                                    {/* Only show cancel if order can be cancelled */}
                                    {order.status === "Not Yet Processed" && order.paymentStatus === "Debt" && (
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => handleCancelOrder(order)}
                                      >
                                        Cancel Order
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleDeleteOrder(order._id)}
                                    >
                                      Delete Order
                                    </DropdownMenuItem>
                                  </>
                                )}

                                {/* Only show pay debt if not cancelled and status is debt */}
                                {order.paymentStatus === "Debt" && (
                                  <DropdownMenuItem onClick={() => handleDebtPayment(order)}>Pay Debt</DropdownMenuItem>
                                )}
                              </>
                            )}

                            {/* Tombol Upload Completion Proof */}
                            {userRole === "admin" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="mr-2"
                                onClick={() => openUploadDialog(order._id)}
                              >
                                Upload Completion Proof
                              </Button>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Proof Viewer */}
      <PaymentProofViewer
        isOpen={isProofViewerOpen}
        onClose={() => setIsProofViewerOpen(false)}
        imageUrl={selectedProofUrl}
        orderId={selectedOrderId}
      />

      {/* Debt Payment Form */}
      <DebtPaymentForm
        isOpen={isDebtPaymentOpen}
        onClose={() => setIsDebtPaymentOpen(false)}
        orderId={selectedOrderId}
        onPaymentSubmitted={() => fetchOrders(selectedYear, selectedMonth)}
      />

      {/* Cancel Order Dialog */}
      <CancelOrderDialog
        isOpen={isCancelOrderOpen}
        onClose={() => setIsCancelOrderOpen(false)}
        orderId={selectedOrderId}
        onOrderCancelled={() => fetchOrders(selectedYear, selectedMonth)}
      />

      {/* Reject Payment Dialog */}
      <RejectPaymentDialog
        isOpen={isRejectPaymentOpen}
        onClose={() => setIsRejectPaymentOpen(false)}
        orderId={selectedOrderId}
        onPaymentRejected={() => fetchOrders(selectedYear, selectedMonth)}
      />
    </div>
  )
}
