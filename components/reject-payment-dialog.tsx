"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { orderService } from "@/lib/api-services"

interface RejectPaymentDialogProps {
    isOpen: boolean
    onClose: () => void
    orderId: string
    onPaymentRejected: () => void
}

export function RejectPaymentDialog({ isOpen, onClose, orderId, onPaymentRejected }: RejectPaymentDialogProps) {
    const [reason, setReason] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleReject = async () => {
        setIsSubmitting(true)

        try {
            // Pastikan kita mengirim "Payment Rejected" sebagai status
            await orderService.updatePaymentStatus(orderId, "Payment Rejected", reason)

            toast({
                title: "Payment rejected",
                description: "The payment has been rejected. Order status changed to debt - customer can try paying again.",
            })

            onPaymentRejected()
            onClose()
        } catch (error: any) {
            // Menambahkan type any untuk error
            console.error("Failed to reject payment:", error)
            toast({
                title: "Error",
                description: error.message || "Failed to reject payment. Please try again.", // Menampilkan pesan error dari API
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
                    <DialogTitle>Reject Payment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to reject this payment? The order will remain active with debt status, and the
                        customer can try paying again.
                    </p>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for rejection (optional)</Label>
                        <Textarea
                            id="reason"
                            placeholder="Enter reason for payment rejection"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReject} disabled={isSubmitting}>
                        {isSubmitting ? "Rejecting..." : "Reject Payment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
