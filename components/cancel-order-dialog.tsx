"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"

interface CancelOrderDialogProps {
    isOpen: boolean
    onClose: () => void
    orderId: string
    onOrderCancelled: () => void
}

export function CancelOrderDialog({ isOpen, onClose, orderId, onOrderCancelled }: CancelOrderDialogProps) {
    const [reason, setReason] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleCancel = async () => {
        setIsSubmitting(true)

        try {
            await orderService.cancelOrder(orderId, reason)

            toast({
                title: "Order cancelled",
                description: "The order has been cancelled successfully",
            })

            onOrderCancelled()
            onClose()
        } catch (error) {
            console.error("Failed to cancel order:", error)
            toast({
                title: "Error",
                description: "Failed to cancel order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setReason("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Cancel Order</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to cancel this order? This action cannot be undone.
                    </p>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for cancellation (optional)</Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for cancellation"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                        No, Keep Order
                    </Button>
                    <Button variant="destructive" onClick={handleCancel} disabled={isSubmitting}>
                        {isSubmitting ? "Cancelling..." : "Yes, Cancel Order"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
