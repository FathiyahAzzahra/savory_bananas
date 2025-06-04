"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PaymentProofViewerProps {
    imageUrl: string
    isOpen: boolean
    onClose: () => void
    orderId?: string
}

export function PaymentProofViewer({ imageUrl, isOpen, onClose, orderId }: PaymentProofViewerProps) {
    const [isDownloading, setIsDownloading] = useState(false)
    const { toast } = useToast()

    const handleDownload = async () => {
        try {
            setIsDownloading(true)

            const response = await fetch(imageUrl)
            const blob = await response.blob()

            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `payment-proof-${orderId || "unknown"}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast({
                title: "Download started",
                description: "Payment proof is being downloaded.",
            })
        } catch (error) {
            console.error("Download failed:", error)
            toast({
                title: "Download failed",
                description: "Failed to download payment proof. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-auto">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle>Payment Proof</DialogTitle>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
                            <Download className="h-4 w-4 mr-2" />
                            {isDownloading ? "Downloading..." : "Download"}
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex justify-center items-center max-h-[75vh] overflow-auto">
                    <img
                        src={imageUrl || "/placeholder.svg"}
                        alt="Payment Proof"
                        className="w-auto max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
