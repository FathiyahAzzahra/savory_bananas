"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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
                    <DialogTitle className="flex items-center justify-between">
                        Payment Proof - Order #{orderId}
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
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
