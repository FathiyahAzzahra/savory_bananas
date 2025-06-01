import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Update receipt URL
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const { receiptUrl } = await req.json()

        if (!receiptUrl) {
            return NextResponse.json({ error: "Receipt URL is required" }, { status: 400 })
        }

        const order = await Order.findByIdAndUpdate(params.id, { receiptUrl }, { new: true, runValidators: true })

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        return NextResponse.json(order)
    } catch (error: any) {
        console.error("Error updating receipt URL:", error)
        return NextResponse.json({ error: error.message || "Failed to update receipt URL" }, { status: 500 })
    }
}
