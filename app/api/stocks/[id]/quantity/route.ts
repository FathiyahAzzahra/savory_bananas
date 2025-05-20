import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Stock from "@/models/Stock"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Update stock quantity
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { quantity } = await req.json()

    if (quantity === undefined) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 })
    }

    const stock = await Stock.findByIdAndUpdate(params.id, { quantity }, { new: true, runValidators: true })

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json(stock)
  } catch (error: any) {
    console.error("Error updating stock quantity:", error)
    return NextResponse.json({ error: error.message || "Failed to update stock quantity" }, { status: 500 })
  }
}
