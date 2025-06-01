"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"
import type { Order } from "@/lib/types"
import { useSession } from "next-auth/react" // Import useSession dari next-auth
import * as React from 'react'


export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession() // Mengambil session dari NextAuth.js
  const { id } = React.use(params)
  const [order, setOrder] = useState<Order | null>(null)


  // Ambil role dari session, pastikan session sudah terambil
  const userRole = session?.user?.role // Pastikan properti 'role' ada di session

  useEffect(() => {
    const fetchOrder = async () => {
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

    fetchOrder()
  }, [id, toast])

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

  const handleUpdateOrderStatus = async (status: string) => {
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

  const handleUpdatePaymentStatus = async (paymentStatus: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>

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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Actions</CardTitle>
            <CardDescription>Update order status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(userRole === "admin" || userRole === "owner") && (
              <div className="space-y-4">
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
            {(userRole === "admin" || userRole === "owner") && (
              <div className="space-y-4">
                {order.paymentStatus === "Debt" && (
                  <Button className="w-full" onClick={() => handleUpdatePaymentStatus("Paid")}>
                    Mark as Paid
                  </Button>
                )}
                <Button variant="destructive" className="w-full" onClick={handleDeleteOrder}>
                  Delete Order
                </Button>
              </div>
            )}
            {((userRole === "owner" && order.status === "Completed") ||
              (userRole === "admin" && order.paymentStatus === "Paid")) && (
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
    </div>
  )
}
