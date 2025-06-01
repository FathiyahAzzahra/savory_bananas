"use client"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { uploadImageToCloudinary } from "@/lib/cloudinary"

interface ReceiptData {
    receiptId: string
    customerName: string
    products: Array<{
        name: string
        quantity: number
        price: number
    }>
    subtotal: number
    discount?: {
        type: "nominal" | "percentage"
        value: number
        amount: number
    }
    total: number
    paymentMethod: string
    cashReceived?: number
    change?: number
    cashier: string
    createdAt: string
}

interface ReceiptGeneratorProps {
    receipt: ReceiptData
    onReceiptGenerated?: (imageUrl: string) => void
}

export function ReceiptGenerator({ receipt, onReceiptGenerated }: ReceiptGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const generateReceiptImage = async () => {
        const canvas = canvasRef.current
        if (!canvas) return null

        const ctx = canvas.getContext("2d")
        if (!ctx) return null

        // Set canvas size
        canvas.width = 400
        canvas.height = 600

        // Set background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Set text properties
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"

        let y = 30

        // Header
        ctx.font = "bold 20px Arial"
        ctx.fillText("SAVORYBANANAS", canvas.width / 2, y)
        y += 25

        ctx.font = "12px Arial"
        ctx.fillText("Jl. Way Besay No.34a, RT.4/RW.1", canvas.width / 2, y)
        y += 15
        ctx.fillText("Tj. Duren Sel., Kec. Grogol petamburan", canvas.width / 2, y)
        y += 15
        ctx.fillText("Kota Jakarta Barat, DKI Jakarta 11470", canvas.width / 2, y)
        y += 30

        // Date and receipt info
        ctx.font = "12px Arial"
        ctx.fillText(new Date(receipt.createdAt).toLocaleString("id-ID"), canvas.width / 2, y)
        y += 25

        ctx.textAlign = "left"
        ctx.fillText(`ID Trans: ${receipt.receiptId}`, 20, y)
        y += 15
        ctx.fillText(`Kasir: ${receipt.cashier}`, 20, y)
        y += 15
        ctx.fillText(`Customer: ${receipt.customerName}`, 20, y)
        y += 25

        // Line separator
        ctx.beginPath()
        ctx.moveTo(20, y)
        ctx.lineTo(canvas.width - 20, y)
        ctx.stroke()
        y += 20

        // Products
        ctx.font = "12px Arial"
        receipt.products.forEach((product) => {
            ctx.fillText(product.name, 20, y)
            y += 15
            ctx.fillText(`${product.quantity} x ${formatPrice(product.price)}`, 30, y)
            ctx.textAlign = "right"
            ctx.fillText(formatPrice(product.price * product.quantity), canvas.width - 20, y)
            ctx.textAlign = "left"
            y += 20
        })

        // Line separator
        ctx.beginPath()
        ctx.moveTo(20, y)
        ctx.lineTo(canvas.width - 20, y)
        ctx.stroke()
        y += 20

        // Totals
        ctx.textAlign = "left"
        ctx.fillText("Subtotal:", 20, y)
        ctx.textAlign = "right"
        ctx.fillText(formatPrice(receipt.subtotal), canvas.width - 20, y)
        y += 15

        if (receipt.discount) {
            ctx.textAlign = "left"
            ctx.fillText("Diskon:", 20, y)
            ctx.textAlign = "right"
            ctx.fillText(`-${formatPrice(receipt.discount.amount)}`, canvas.width - 20, y)
            y += 15
        }

        ctx.font = "bold 14px Arial"
        ctx.textAlign = "left"
        ctx.fillText("Total:", 20, y)
        ctx.textAlign = "right"
        ctx.fillText(formatPrice(receipt.total), canvas.width - 20, y)
        y += 20

        if (receipt.paymentMethod === "cash" && receipt.cashReceived) {
            ctx.font = "12px Arial"
            ctx.textAlign = "left"
            ctx.fillText("Uang Diterima:", 20, y)
            ctx.textAlign = "right"
            ctx.fillText(formatPrice(receipt.cashReceived), canvas.width - 20, y)
            y += 15

            ctx.textAlign = "left"
            ctx.fillText("Kembalian:", 20, y)
            ctx.textAlign = "right"
            ctx.fillText(formatPrice(receipt.change || 0), canvas.width - 20, y)
            y += 20
        }

        // Footer
        y += 20
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Terima kasih atas kunjungan Anda!", canvas.width / 2, y)

        return canvas
    }

    // Automatically generate and upload receipt when component mounts
    useEffect(() => {
        if (receipt && !isUploaded && !isUploading) {
            uploadReceiptToCloudinary()
        }
    }, [receipt])

    const uploadReceiptToCloudinary = async () => {
        if (!receipt || isUploading || isUploaded) return

        setIsUploading(true)

        try {
            const canvas = await generateReceiptImage()
            if (!canvas) {
                console.error("Failed to generate receipt image")
                return
            }

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error("Failed to create blob from canvas")
                    setIsUploading(false)
                    return
                }

                try {
                    const file = new File([blob], `receipt-${receipt.receiptId}.png`, { type: "image/png" })
                    const imageUrl = await uploadImageToCloudinary(file)

                    if (imageUrl && onReceiptGenerated) {
                        onReceiptGenerated(imageUrl)
                        setIsUploaded(true)
                    }
                } catch (error) {
                    console.error("Failed to upload receipt:", error)
                } finally {
                    setIsUploading(false)
                }
            }, "image/png")
        } catch (error) {
            console.error("Error generating receipt:", error)
            setIsUploading(false)
        }
    }

    const downloadReceipt = async () => {
        const canvas = await generateReceiptImage()
        if (!canvas) return

        // Convert canvas to blob
        canvas.toBlob((blob) => {
            if (!blob) return

            // Create download link
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `receipt-${receipt.receiptId}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }, "image/png")
    }

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <Button onClick={downloadReceipt} className="w-full" disabled={isUploading}>
                <Download className="mr-2 h-4 w-4" />
                {isUploading ? "Generating Receipt..." : "Download Receipt"}
            </Button>
        </div>
    )
}
