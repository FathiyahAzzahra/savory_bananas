import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Stock from "@/models/Stock"
import { authOptions } from "../auth/[...nextauth]/route"

// Get all stock items
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const stocks = await Stock.find({}).sort({ name: 1 })

    return NextResponse.json(stocks)
  } catch (error: any) {
    console.error("Error fetching stocks:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch stocks" }, { status: 500 })
  }
}

// Create a new stock item
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized - Please login" }, { status: 401 })
    }

    console.log("User role attempting to add stock:", session.user.role) // Debug log

    // Allow both admin and owner to add stock
    if (session.user.role !== "admin" && session.user.role !== "owner") {
      return NextResponse.json(
        {
          error: `Forbidden - Only admin or owner can add stock. Your role: ${session.user.role}`,
        },
        { status: 403 },
      )
    }

    await dbConnect()

    const { name, quantity, unit, price, imageUrl } = await req.json()

    // Validate input
    if (!name || quantity === undefined || !unit || price === undefined) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
    }

    // Create stock item
    const stock = await Stock.create({
      name,
      quantity,
      unit,
      price,
      imageUrl,
    })

    return NextResponse.json(stock, { status: 201 })
  } catch (error: any) {
    console.error("Error creating stock:", error)
    return NextResponse.json({ error: error.message || "Failed to create stock item" }, { status: 500 })
  }
}
