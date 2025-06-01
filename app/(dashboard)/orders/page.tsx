"use client"

import { useState, useEffect } from "react"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"
import { PaymentProofViewer } from "@/components/payment-proof-viewer"
import type { Order } from "@/lib/types"

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
  const [selectedProofUrl, setSelectedProofUrl] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [isProofViewerOpen, setIsProofViewerOpen] = useState(false)

  const userRole = session?.user?.role

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const data = await orderService.getAll()
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

    fetchOrders()
  }, [toast])

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

  const getPaymentBadge = (status: string, paymentProofUrl?: string, receiptUrl?: string, orderId?: string) => {
    const hasProof = paymentProofUrl || receiptUrl

    switch (status) {
      case "Paid":
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300 font-medium cursor-pointer hover:bg-green-200"
              onClick={() => hasProof && handleViewPaymentProof(paymentProofUrl || receiptUrl || "", orderId || "")}            >
              Paid
            </Badge>
            {hasProof && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleViewPaymentProof(paymentProofUrl || receiptUrl || "", orderId || "")}              >
                <Eye className="h-3 w-3" />
              </Button>
            )}
          </div>
        )
      case "Debt":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-medium">
            Debt
          </Badge>
        )
      case "Pending Verification":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium">
              Pending Verification
            </Badge>
            {paymentProofUrl && (
              <Button size="sm" variant="ghost" onClick={() => handleViewPaymentProof(paymentProofUrl, orderId || "")}>                <Eye className="h-3 w-3" />
              </Button>
            )}
          </div>
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

      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status }
        }
        return order
      })

      setOrders(updatedOrders)

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

      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, paymentStatus }
        }
        return order
      })

      setOrders(updatedOrders)

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

      const updatedOrders = orders.filter((order) => order._id !== orderId)
      setOrders(updatedOrders)

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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Not Yet Processed">Not Yet Processed</SelectItem>
                <SelectItem value="Being Sent">Being Sent</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
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
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
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
                        {getPaymentBadge(order.paymentStatus, order.paymentProofUrl, order.receiptUrl, order._id)}                      </TableCell>
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

                            {(userRole === "admin" || userRole === "owner") && order.status === "Not Yet Processed" && (
                              <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order._id, "Being Sent")}>
                                Mark as Being Sent
                              </DropdownMenuItem>
                            )}
                            {(userRole === "admin" || userRole === "owner") && order.status === "Being Sent" && (
                              <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order._id, "Completed")}>
                                Mark as Completed
                              </DropdownMenuItem>
                            )}
                            {(userRole === "admin" || userRole === "owner") && order.paymentStatus === "Pending Verification" && (
                              <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(order._id, "Paid")}>
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                            {(userRole === "admin" || userRole === "owner") && (
                              <>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteOrder(order._id)}>
                                  Delete Order
                                </DropdownMenuItem>
                              </>
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

      <PaymentProofViewer
        isOpen={isProofViewerOpen}
        onClose={() => setIsProofViewerOpen(false)}
        imageUrl={selectedProofUrl}
        orderId={selectedOrderId}
      />
    </div>
  )
}
