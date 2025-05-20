import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Stock from "@/models/Stock"
import { authOptions } from "../../auth/[...nextauth]/route"

// Get stock by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const stock = await Stock.findById(params.id)

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json(stock)
  } catch (error: any) {
    console.error("Error fetching stock:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch stock" }, { status: 500 })
  }
}

// Update stock
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await dbConnect()

    const { name, quantity, unit, price } = await req.json()

    const stock = await Stock.findByIdAndUpdate(
      params.id,
      {
        name,
        quantity,
        unit,
        price,
      },
      { new: true, runValidators: true },
    )

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json(stock)
  } catch (error: any) {
    console.error("Error updating stock:", error)
    return NextResponse.json({ error: error.message || "Failed to update stock" }, { status: 500 })
  }
}

// Delete stock
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await dbConnect()

    const stock = await Stock.findByIdAndDelete(params.id)

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Stock deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting stock:", error)
    return NextResponse.json({ error: error.message || "Failed to delete stock" }, { status: 500 })
  }
}
