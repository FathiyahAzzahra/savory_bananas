import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import Stock from "@/models/Stock"
import { authOptions } from "../auth/[...nextauth]/route"

// Get all orders
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = req.nextUrl
    const year = searchParams.get("year")
    const month = searchParams.get("month")

    const query: any = {}

    if (year && month) {
      const startOfMonth = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
      const endOfMonth = new Date(Number.parseInt(year), Number.parseInt(month), 0) // Last day of the month
      endOfMonth.setHours(23, 59, 59, 999) // Set to end of day

      query.createdAt = {
        $gte: startOfMonth,
        $lte: endOfMonth,
      }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 })
    return NextResponse.json(orders)
  } catch (error: any) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch orders" }, { status: 500 })
  }
}

// Create a new order
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const {
      customerName,
      products,
      totalPrice,
      status,
      paymentStatus,
      paymentMethod,
      paymentProofUrl,
      receiptUrl,
      discount,
      cashReceived,
      change,
      receiptId,
    } = await req.json()

    // Validate input
    if (!customerName || !products || products.length === 0) {
      return NextResponse.json({ error: "Please provide customer name and products" }, { status: 400 })
    }

    // Validate payment proof for transfer payments
    if (paymentMethod === "transfer" && !paymentProofUrl) {
      return NextResponse.json({ error: "Payment proof is required for transfer payments" }, { status: 400 })
    }

    // Check stock availability and update stock
    for (const product of products) {
      const stockItem = await Stock.findById(product.productId)

      if (!stockItem) {
        return NextResponse.json({ error: `Product ${product.name} not found` }, { status: 400 })
      }

      if (stockItem.quantity < product.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name}. Available: ${stockItem.quantity}` },
          { status: 400 },
        )
      }

      // Update stock quantity
      stockItem.quantity -= product.quantity
      await stockItem.save()
    }

    // Create order
    const order = await Order.create({
      customerName,
      products,
      totalPrice,
      status: status || "Not Yet Processed",
      paymentStatus: paymentStatus || "Pending Verification",
      paymentMethod,
      paymentProofUrl,
      receiptUrl,
      discount,
      cashReceived,
      change,
      receiptId,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
