import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import Stock from "@/models/Stock"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Cancel order
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (session.user.role !== "admin" && session.user.role !== "owner") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await dbConnect()

        const { reason } = await req.json()
        const { id } = await params


        // Find the order
        const order = await Order.findById(id)

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Don't allow cancelling orders that are already cancelled
        if (order.status === "Cancelled") {
            return NextResponse.json({ error: "Order is already cancelled" }, { status: 400 })
        }

        // Don't allow cancelling orders that are being sent
        if (order.status === "Being Sent") {
            return NextResponse.json({ error: "Cannot cancel orders that are being sent" }, { status: 400 })
        }

        // Don't allow cancelling completed orders
        if (order.status === "Completed") {
            return NextResponse.json({ error: "Cannot cancel completed orders" }, { status: 400 })
        }


        // Don't allow cancelling paid orders
        if (order.paymentStatus === "Paid") {
            return NextResponse.json({ error: "Cannot cancel paid orders" }, { status: 400 })
        }


        // Don't allow cancelling orders with pending payment verification
        if (order.paymentStatus === "Pending Verification") {
            return NextResponse.json(
                {
                    error: "Cannot cancel orders with pending payment verification. Please approve or reject the payment first.",
                },
                { status: 400 },
            )
        }

        // Only allow cancelling orders with "Not Yet Processed" status and "Debt" payment status
        const allowedOrderStatuses = ["Not Yet Processed"]
        const allowedPaymentStatuses = ["Debt"]

        if (!allowedOrderStatuses.includes(order.status)) {
            return NextResponse.json(
                { error: "Orders can only be cancelled when status is 'Not Yet Processed'" },
                { status: 400 },
            )
        }

        if (!allowedPaymentStatuses.includes(order.paymentStatus)) {
            return NextResponse.json({ error: "Orders can only be cancelled when payment status is 'Debt'" }, { status: 400 })
        }

        // Return products to stock
        for (const product of order.products) {
            const stockItem = await Stock.findById(product.productId)
            if (stockItem) {
                stockItem.quantity += product.quantity
                await stockItem.save()
            }
        }

        // Update order status and payment status
        order.status = "Cancelled"
        order.paymentStatus = "Cancelled"
        order.cancellationReason = reason || "Order cancelled by " + session.user.role

        await order.save()

        return NextResponse.json(order)
    } catch (error: any) {
        console.error("Error cancelling order:", error)
        return NextResponse.json({ error: error.message || "Failed to cancel order" }, { status: 500 })
    }
}
