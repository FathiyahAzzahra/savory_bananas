import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const { name, username, password, role } = await req.json()

    // Validate input
    if (!name || !username || !password) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Create new user
    const user = await User.create({
      name,
      username,
      password,
      role: role || "owner",
    })

    // Return user without password
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    }

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message || "Failed to register user" }, { status: 500 })
  }
}
