import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Update payment status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await dbConnect()

    const { paymentStatus } = await req.json()

    if (!paymentStatus) {
      return NextResponse.json({ error: "Payment status is required" }, { status: 400 })
    }

    const order = await Order.findByIdAndUpdate(params.id, { paymentStatus }, { new: true, runValidators: true })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Error updating payment status:", error)
    return NextResponse.json({ error: error.message || "Failed to update payment status" }, { status: 500 })
  }
}
