import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Update payment status
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Perbaikan: Izinkan 'owner' selain 'admin' untuk mengubah status pembayaran
    if (session.user.role !== "admin" && session.user.role !== "owner") {
      console.warn(
        `Forbidden: User ${session.user.username} with role ${session.user.role} attempted to update payment status.`,
      )
      return NextResponse.json({ error: "Forbidden: Only admin or owner can update payment status." }, { status: 403 })
    }

    await dbConnect()

    const { paymentStatus, reason } = await req.json()
    const { id } = await params

    if (!paymentStatus) {
      return NextResponse.json({ error: "Payment status is required" }, { status: 400 })
    }

    const order = await Order.findById(id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    console.log("Before update - Order:", {
      id: order._id,
      paymentStatus: order.paymentStatus,
      paymentProofUrl: order.paymentProofUrl,
    })

    // If rejecting payment, change status to debt and clear payment proof
    if (paymentStatus === "Payment Rejected") {
      console.log("Rejecting payment - changing to Debt status and clearing proof URL")

      // Change payment status to debt so customer can try paying again
      order.paymentStatus = "Debt"

      // Clear previous payment proof - ensure we're setting it to null/undefined
      order.paymentProofUrl = undefined

      // Make sure to unset the field if it exists
      if (order.toObject().hasOwnProperty("paymentProofUrl")) {
        order.set("paymentProofUrl", undefined)
      }

      // Keep the order status as is (don't cancel)
      // Add rejection reason for reference
      order.cancellationReason = reason || "Payment rejected by admin - can retry payment"

      console.log("After rejection changes (before save):", {
        paymentStatus: order.paymentStatus,
        paymentProofUrl: order.paymentProofUrl,
      })
    } else {
      // For other payment status updates
      order.paymentStatus = paymentStatus
    }

    const savedOrder = await order.save()

    console.log("After update - Saved order:", {
      id: savedOrder._id,
      paymentStatus: savedOrder.paymentStatus,
      paymentProofUrl: savedOrder.paymentProofUrl,
    })

    return NextResponse.json(savedOrder)
  } catch (error: any) {
    console.error("Error updating payment status:", error)
    return NextResponse.json({ error: error.message || "Failed to update payment status" }, { status: 500 })
  }
}
