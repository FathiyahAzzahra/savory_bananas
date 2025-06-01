"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PaymentProofViewerProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    orderId: string
}

export function PaymentProofViewer({ isOpen, onClose, imageUrl, orderId }: PaymentProofViewerProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Payment Proof - Order #{orderId}</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                    <img
                        src={imageUrl || "/placeholder.svg"}
                        alt="Payment proof"
                        className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
