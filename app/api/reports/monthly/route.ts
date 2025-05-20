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

    // 🔁 Update: Admin & Owner diizinkan
    const allowedRoles = ["admin", "owner"]
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const year = searchParams.get("year") || new Date().getFullYear().toString()

    await dbConnect()

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`)
    const endDate = new Date(`${Number.parseInt(year) + 1}-01-01T00:00:00.000Z`)

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).sort({ createdAt: 1 })

    const monthlyData: Record<string, any> = {}
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    months.forEach((month) => {
      monthlyData[month] = {
        month,
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      }
    })

    orders.forEach((order: { createdAt: string | number | Date; totalPrice: number }) => {
      const month = months[new Date(order.createdAt).getMonth()]
      monthlyData[month].totalSales += order.totalPrice
      monthlyData[month].totalOrders += 1
    })

    Object.keys(monthlyData).forEach((month) => {
      if (monthlyData[month].totalOrders > 0) {
        monthlyData[month].averageOrderValue =
          monthlyData[month].totalSales / monthlyData[month].totalOrders
      }
    })

    const result = Object.values(monthlyData)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch reports" },
      { status: 500 }
    )
  }
}
