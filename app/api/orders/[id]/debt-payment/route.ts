import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Submit payment proof for debt (transfer)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const { paymentProofUrl } = await req.json()
        const { id } = await params

        if (!paymentProofUrl) {
            return NextResponse.json({ error: "Payment proof URL is required" }, { status: 400 })
        }

        const order = await Order.findById(id)

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Ensure the order is in debt status
        if (order.paymentStatus !== "Debt") {
            return NextResponse.json({ error: "Order is not in debt status" }, { status: 400 })
        }


        // Don't allow payment for cancelled orders
        if (order.status === "Cancelled") {
            return NextResponse.json({ error: "Cannot pay for cancelled orders" }, { status: 400 })
        }

        // Update order with payment proof and change status to pending verification
        order.paymentProofUrl = paymentProofUrl
        order.paymentStatus = "Pending Verification"
        order.paymentMethod = "transfer"
        await order.save()

        return NextResponse.json(order)
    } catch (error: any) {
        console.error("Error submitting debt payment:", error)
        return NextResponse.json({ error: error.message || "Failed to submit debt payment" }, { status: 500 })
    }
}

// Submit cash payment for debt
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const { cashReceived, change, receiptUrl } = await req.json()
        const { id } = await params


        if (!cashReceived || !receiptUrl) {
            return NextResponse.json({ error: "Cash received and receipt URL are required" }, { status: 400 })
        }

        const order = await Order.findById(id)

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Ensure the order is in debt status
        if (order.paymentStatus !== "Debt") {
            return NextResponse.json({ error: "Order is not in debt status" }, { status: 400 })
        }


        // Don't allow payment for cancelled orders
        if (order.status === "Cancelled") {
            return NextResponse.json({ error: "Cannot pay for cancelled orders" }, { status: 400 })
        }

        // Validate cash received amount
        if (cashReceived < order.totalPrice) {
            return NextResponse.json({ error: "Cash received must be at least the total amount" }, { status: 400 })
        }

        // Update order with cash payment details
        order.paymentStatus = "Paid"
        order.paymentMethod = "cash"
        order.cashReceived = cashReceived
        order.change = change
        order.receiptUrl = receiptUrl
        await order.save()

        return NextResponse.json(order)
    } catch (error: any) {
        console.error("Error processing cash debt payment:", error)
        return NextResponse.json({ error: error.message || "Failed to process cash payment" }, { status: 500 })
    }
}
