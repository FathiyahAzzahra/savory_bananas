"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { stockService, orderService } from "@/lib/api-services"
import type { Stock } from "@/lib/types"

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export default function NewOrderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [stock, setStock] = useState<Stock[]>([])
  const [customerName, setCustomerName] = useState("")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [paymentStatus, setPaymentStatus] = useState("Not Yet Paid")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch stock
    const fetchStock = async () => {
      try {
        setIsLoading(true)
        const data = await stockService.getAll()
        setStock(data)

        // If stock exists, add first item to order by default
        if (data.length > 0) {
          const firstProduct = data[0]
          setOrderItems([
            {
              productId: firstProduct._id,
              name: firstProduct.name,
              price: firstProduct.price,
              quantity: 1,
            },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch stock:", error)
        toast({
          title: "Error",
          description: "Failed to load stock items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStock()
  }, [toast])

  const addOrderItem = () => {
    if (stock.length === 0) return

    const firstProduct = stock[0]
    setOrderItems([
      ...orderItems,
      {
        productId: firstProduct._id,
        name: firstProduct.name,
        price: firstProduct.price,
        quantity: 1,
      },
    ])
  }

  const removeOrderItem = (index: number) => {
    const newItems = [...orderItems]
    newItems.splice(index, 1)
    setOrderItems(newItems)
  }

  const updateOrderItem = (index: number, field: string, value: string | number) => {
    const newItems = [...orderItems]

    if (field === "productId") {
      const selectedProduct = stock.find((item) => item._id === value)
      if (selectedProduct) {
        newItems[index] = {
          ...newItems[index],
          productId: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: newItems[index].quantity,
        }
      }
    } else if (field === "quantity") {
      const quantity = Number(value)
      if (quantity > 0) {
        newItems[index] = {
          ...newItems[index],
          quantity,
        }
      }
    }

    setOrderItems(newItems)
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (customerName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a customer name",
        variant: "destructive",
      })
      return
    }

    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product to the order",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create order
      const orderData = {
        customerName,
        products: orderItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: calculateTotal(),
        status: "Not Yet Processed",
        paymentStatus,
      }

      await orderService.create(orderData)

      toast({
        title: "Order created",
        description: "The order has been created successfully",
      })

      router.push("/orders")
    } catch (error) {
      console.error("Failed to create order:", error)
      toast({
        title: "Error",
        description: "Failed to create the order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading stock data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Order</h2>
        <p className="text-muted-foreground">Create a new customer order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Items</CardTitle>
              <Button type="button" onClick={addOrderItem} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent>
              {stock.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No stock items available. Please add stock items first.
                </div>
              ) : orderItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No items added to this order yet. Click "Add Item" to add products.
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="grid gap-2 md:col-span-2">
                          <Label htmlFor={`product-${index}`}>Product</Label>
                          <select
                            id={`product-${index}`}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={item.productId}
                            onChange={(e) => updateOrderItem(index, "productId", e.target.value)}
                          >
                            {stock.map((product) => (
                              <option key={product._id} value={product._id}>
                                {product.name} - {formatPrice(product.price)} ({product.quantity} {product.unit}{" "}
                                available)
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                          <Input
                            id={`quantity-${index}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateOrderItem(index, "quantity", e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Subtotal</Label>
                          <div className="flex h-10 items-center">{formatPrice(item.price * item.quantity)}</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                          onClick={() => removeOrderItem(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {orderItems.length > 0 && (
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-semibold">{formatPrice(calculateTotal())}</div>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="not-paid"
                    name="paymentStatus"
                    value="Not Yet Paid"
                    checked={paymentStatus === "Not Yet Paid"}
                    onChange={() => setPaymentStatus("Not Yet Paid")}
                    className="h-4 w-4 border-primary text-primary"
                  />
                  <Label htmlFor="not-paid">Not Yet Paid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paid"
                    name="paymentStatus"
                    value="Paid"
                    checked={paymentStatus === "Paid"}
                    onChange={() => setPaymentStatus("Paid")}
                    className="h-4 w-4 border-primary text-primary"
                  />
                  <Label htmlFor="paid">Paid</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || orderItems.length === 0}>
              {isSubmitting ? "Creating Order..." : "Create Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
