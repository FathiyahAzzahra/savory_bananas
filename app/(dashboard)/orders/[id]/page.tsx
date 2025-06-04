"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, AlertTriangle, Ban, CreditCard, FileCheck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"
import { PaymentProofViewer } from "@/components/payment-proof-viewer"
import { DebtPaymentForm } from "@/components/debt-payment-form"
import { CancelOrderDialog } from "@/components/cancel-order-dialog"
import { RejectPaymentDialog } from "@/components/reject-payment-dialog"
import type { Order } from "@/lib/types"
import { useSession } from "next-auth/react"
import { use } from "react"

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  // Unwrap the params Promise
  const { id } = use(params)

  // Dialog states
  const [isPaymentProofOpen, setIsPaymentProofOpen] = useState(false)
  const [isDebtPaymentOpen, setIsDebtPaymentOpen] = useState(false)
  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState(false)
  const [isRejectPaymentOpen, setIsRejectPaymentOpen] = useState(false)

  // Get user role from session
  const userRole = session?.user?.role

  useEffect(() => {
    fetchOrderDetails()
  }, [id])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const data = await orderService.getById(id)
      setOrder(data)
    } catch (error) {
      console.error("Failed to fetch order:", error)
      toast({
        title: "Error",
        description: "Failed to load order details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
            Paid
          </Badge>
        )
      case "Debt":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-medium">
            Debt
          </Badge>
        )
      case "Pending Verification":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium">
            Pending Verification
          </Badge>
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

  const handleUpdateOrderStatus = async (status: any) => {
    try {
      await orderService.updateStatus(id, status)

      // Update local state
      if (order) {
        setOrder({
          ...order,
          status,
        })
      }

      toast({
        title: "Status updated",
        description: `Order status updated to ${status}`,
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

  const handleUpdatePaymentStatus = async (paymentStatus: any) => {
    try {
      await orderService.updatePaymentStatus(id, paymentStatus)

      // Update local state
      if (order) {
        setOrder({
          ...order,
          paymentStatus,
        })
      }

      toast({
        title: "Payment status updated",
        description: `Order payment status updated to ${paymentStatus}`,
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

  const handleDeleteOrder = async () => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return
    }

    try {
      await orderService.delete(id)

      toast({
        title: "Order deleted",
        description: "Order has been deleted successfully",
      })

      router.push("/orders")
    } catch (error) {
      console.error("Failed to delete order:", error)
      toast({
        title: "Error",
        description: "Failed to delete order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleViewPaymentProof = () => {
    if (order?.paymentProofUrl || order?.receiptUrl) {
      setIsPaymentProofOpen(true)
    } else {
      toast({
        title: "No payment proof",
        description: "This order doesn't have a payment proof attached",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">Order not found</h3>
              <p className="text-muted-foreground mt-2">
                The order you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isOrderCancelled = order.status === "Cancelled"
  const isOrderCompleted = order.status === "Completed"
  const isOrderBeingSent = order.status === "Being Sent"
  const isPendingVerification = order.paymentStatus === "Pending Verification"
  const isDebtPayment = order.paymentStatus === "Debt"
  const isPaymentRejected = order.paymentStatus === "Payment Rejected"
  const isPaid = order.paymentStatus === "Paid"
  const isPaymentCancelled = order.paymentStatus === "Cancelled"

  // Check if order can be cancelled (only "Not Yet Processed" status with "Debt" payment status)
  const canBeCancelled = order.status === "Not Yet Processed" && isDebtPayment && !isOrderCancelled

  // Check if debt can be paid (is debt and not cancelled)
  const canPayDebt = isDebtPayment && !isOrderCancelled

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
        {userRole === "admin" && !isOrderCancelled && !isOrderCompleted && (
          <Button onClick={() => router.push(`/orders/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Order
          </Button>
        )}
      </div>

      {isOrderCancelled && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">This order has been cancelled</p>
                {order.cancellationReason && <p className="text-sm">Reason: {order.cancellationReason}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isPendingVerification && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Payment verification pending</p>
                <p className="text-sm">This order cannot be cancelled while payment verification is pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(isOrderBeingSent || isOrderCompleted) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Order cannot be cancelled</p>
                <p className="text-sm">Orders that are being sent or completed cannot be cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{order._id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                <p className="text-lg font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p>{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(order.status)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment</p>
                <div className="mt-1">{getPaymentBadge(order.paymentStatus)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                <p className="capitalize">{order.paymentMethod || "N/A"}</p>
              </div>
              {(order.paymentProofUrl || order.receiptUrl) && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Proof</p>
                  <Button variant="outline" size="sm" className="mt-1" onClick={handleViewPaymentProof}>
                    <FileCheck className="mr-1 h-4 w-4" /> View Proof
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Actions</CardTitle>
            <CardDescription>Update order status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isOrderCancelled && !isOrderCompleted && (
              <>
                {/* Order Status Actions */}
                {(userRole === "admin" || userRole === "owner") && (
                  <div className="space-y-2">
                    {order.status === "Not Yet Processed" && (
                      <Button className="w-full" onClick={() => handleUpdateOrderStatus("Being Sent")}>
                        Mark as Being Sent
                      </Button>
                    )}
                    {order.status === "Being Sent" && (
                      <Button className="w-full" onClick={() => handleUpdateOrderStatus("Completed")}>
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                )}

                {/* Payment Actions */}
                {(userRole === "admin" || userRole === "owner") && isPendingVerification && (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => handleUpdatePaymentStatus("Paid")}>
                      Approve Payment
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={() => setIsRejectPaymentOpen(true)}>
                      Reject Payment
                    </Button>
                  </div>
                )}

                {/* Debt Payment Action */}
                {canPayDebt && (
                  <Button className="w-full" onClick={() => setIsDebtPaymentOpen(true)}>
                    <CreditCard className="mr-2 h-4 w-4" /> Pay Debt
                  </Button>
                )}

                {/* Destructive Actions */}
                {(userRole === "admin" || userRole === "owner") && (
                  <div className="space-y-2 pt-2 border-t">
                    {canBeCancelled && (
                      <Button variant="destructive" className="w-full" onClick={() => setIsCancelOrderOpen(true)}>
                        <Ban className="mr-2 h-4 w-4" /> Cancel Order
                      </Button>
                    )}
                    {userRole === "admin" && (
                      <Button variant="destructive" className="w-full" onClick={handleDeleteOrder}>
                        Delete Order
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}

            {(isOrderCancelled || isOrderCompleted) && (
              <div className="text-center py-2 text-muted-foreground">No more actions available for this order</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    {product.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.price)} x {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="font-medium">{formatPrice(product.price * product.quantity)}</div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between font-medium">
            <p>Total</p>
            <p>{formatPrice(order.totalPrice)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Proof Viewer */}
      <PaymentProofViewer
        isOpen={isPaymentProofOpen}
        onClose={() => setIsPaymentProofOpen(false)}
        imageUrl={order.paymentProofUrl || order.receiptUrl || ""}
        orderId={order._id}
      />

      {/* Debt Payment Form */}
      <DebtPaymentForm
        isOpen={isDebtPaymentOpen}
        onClose={() => setIsDebtPaymentOpen(false)}
        orderId={order._id}
        onPaymentSubmitted={fetchOrderDetails}
      />

      {/* Cancel Order Dialog */}
      <CancelOrderDialog
        isOpen={isCancelOrderOpen}
        onClose={() => setIsCancelOrderOpen(false)}
        orderId={order._id}
        onOrderCancelled={fetchOrderDetails}
      />

      {/* Reject Payment Dialog */}
      <RejectPaymentDialog
        isOpen={isRejectPaymentOpen}
        onClose={() => setIsRejectPaymentOpen(false)}
        orderId={order._id}
        onPaymentRejected={fetchOrderDetails}
      />
    </div>
  )
}
