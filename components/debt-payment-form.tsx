"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PaymentProofUpload } from "@/components/payment-proof-upload"
import { ReceiptGenerator } from "@/components/receipt-generator"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"
import type { Order } from "@/lib/types"

interface DebtPaymentFormProps {
    isOpen: boolean
    onClose: () => void
    orderId: string
    onPaymentSubmitted: () => void
}

export function DebtPaymentForm({ isOpen, onClose, orderId, onPaymentSubmitted }: DebtPaymentFormProps) {
    const [orderData, setOrderData] = useState<Order | null>(null)
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("transfer")
    const [paymentProofUrl, setPaymentProofUrl] = useState<string>("")
    const [cashReceived, setCashReceived] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showReceipt, setShowReceipt] = useState(false)
    const { toast } = useToast()

    // Fetch order data when dialog opens
    useEffect(() => {
        if (isOpen && orderId) {
            fetchOrderData()
        }
    }, [isOpen, orderId])

    const fetchOrderData = async () => {
        try {
            setLoading(true)
            const data = await orderService.getById(orderId)
            setOrderData(data)
        } catch (error) {
            console.error("Failed to fetch order data:", error)
            toast({
                title: "Error",
                description: "Failed to load order details. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const calculateChange = () => {
        if (!orderData) return 0
        const received = Number.parseFloat(cashReceived) || 0
        const total = orderData.totalPrice
        return Math.max(0, received - total)
    }

    const handleSubmit = async () => {
        if (!orderData) return

        if (paymentMethod === "transfer" && !paymentProofUrl) {
            toast({
                title: "Error",
                description: "Please upload payment proof first",
                variant: "destructive",
            })
            return
        }

        if (paymentMethod === "cash") {
            const received = Number.parseFloat(cashReceived) || 0
            if (received < orderData.totalPrice) {
                toast({
                    title: "Error",
                    description: "Cash received must be at least the total amount",
                    variant: "destructive",
                })
                return
            }
        }

        setIsSubmitting(true)

        try {
            if (paymentMethod === "cash") {
                // For cash payment, generate receipt first
                setShowReceipt(true)
            } else {
                // For transfer payment, submit proof
                await orderService.submitDebtPayment(orderId, paymentProofUrl)

                toast({
                    title: "Payment submitted",
                    description: "Your payment proof has been submitted and is awaiting verification",
                })

                onPaymentSubmitted()
                onClose()
            }
        } catch (error) {
            console.error("Failed to submit payment:", error)
            toast({
                title: "Error",
                description: "Failed to submit payment. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReceiptGenerated = async (receiptUrl: string) => {
        if (!orderData) return

        try {
            // Submit cash payment with receipt
            await orderService.submitDebtPaymentCash(orderId, {
                cashReceived: Number.parseFloat(cashReceived),
                change: calculateChange(),
                receiptUrl,
            })

            toast({
                title: "Payment completed",
                description: "Cash payment has been processed successfully",
            })

            onPaymentSubmitted()
            onClose()
        } catch (error) {
            console.error("Failed to complete cash payment:", error)
            toast({
                title: "Error",
                description: "Failed to complete payment. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleClose = () => {
        setPaymentMethod("transfer")
        setPaymentProofUrl("")
        setCashReceived("")
        setShowReceipt(false)
        setOrderData(null)
        onClose()
    }

    // Show loading state
    if (loading || !orderData) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Pay Debt</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center py-8">
                        <p className="text-muted-foreground">Loading order details...</p>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    // Prepare receipt data for cash payment with proper discount handling
    const receiptData = {
        receiptId: `RCP-${Date.now()}`,
        customerName: orderData.customerName,
        products: orderData.products,
        subtotal: orderData.totalPrice,
        discount: orderData.discount
            ? {
                type: orderData.discount.type as "nominal" | "percentage",
                value: orderData.discount.value,
                amount: orderData.discount.amount,
            }
            : undefined,
        total: orderData.totalPrice,
        paymentMethod: "cash",
        cashReceived: Number.parseFloat(cashReceived) || 0,
        change: calculateChange(),
        cashier: "System", // You might want to get this from session
        createdAt: new Date().toISOString(),
    }

    if (showReceipt) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Generate Receipt</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <p className="text-sm text-muted-foreground">Generating receipt for cash payment...</p>

                        <ReceiptGenerator receipt={receiptData} onReceiptGenerated={handleReceiptGenerated} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Pay Debt - {formatPrice(orderData.totalPrice)}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium">Order Details</p>
                        <p className="text-sm text-muted-foreground">Customer: {orderData.customerName}</p>
                        <p className="text-sm text-muted-foreground">Order ID: #{orderData._id.slice(-8)}</p>
                    </div>

                    <div>
                        <Label className="text-base font-medium">Payment Method</Label>
                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={(value: "cash" | "transfer") => setPaymentMethod(value)}
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash">Cash Payment</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="transfer" id="transfer" />
                                <Label htmlFor="transfer">Bank Transfer</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {paymentMethod === "cash" && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="total">Total Amount</Label>
                                <Input id="total" value={formatPrice(orderData.totalPrice)} disabled className="bg-muted" />
                            </div>
                            <div>
                                <Label htmlFor="cashReceived">Cash Received</Label>
                                <Input
                                    id="cashReceived"
                                    type="number"
                                    placeholder="Enter cash received amount"
                                    value={cashReceived}
                                    onChange={(e) => setCashReceived(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {cashReceived && Number.parseFloat(cashReceived) >= orderData.totalPrice && (
                                <div>
                                    <Label htmlFor="change">Change</Label>
                                    <Input id="change" value={formatPrice(calculateChange())} disabled className="bg-muted" />
                                </div>
                            )}
                        </div>
                    )}

                    {paymentMethod === "transfer" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Please upload proof of your bank transfer. Once verified, your order status will be updated.
                            </p>

                            <PaymentProofUpload
                                onUploadComplete={(imageUrl) => {
                                    setPaymentProofUrl(imageUrl)
                                    setIsUploading(false)
                                }}
                                onUploadStart={() => setIsUploading(true)}
                                onUploadError={() => setIsUploading(false)}
                                disabled={isSubmitting}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            isSubmitting ||
                            isUploading ||
                            (paymentMethod === "transfer" && !paymentProofUrl) ||
                            (paymentMethod === "cash" && (!cashReceived || Number.parseFloat(cashReceived) < orderData.totalPrice))
                        }
                    >
                        {isSubmitting ? "Processing..." : paymentMethod === "cash" ? "Process Payment" : "Submit Payment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
