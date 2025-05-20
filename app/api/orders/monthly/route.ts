import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month") || new Date().getMonth().toString()
    const year = searchParams.get("year") || new Date().getFullYear().toString()

    await dbConnect()

    // Get start and end date for the requested month
    const startDate = new Date(Number(year), Number(month), 1)
    const endDate = new Date(Number(year), Number(month) + 1, 0, 23, 59, 59, 999)

    // Find orders for the specified month
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: -1 })

    return NextResponse.json(orders)
  } catch (error: any) {
    console.error("Error fetching monthly orders:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch monthly orders" }, { status: 500 })
  }
}
