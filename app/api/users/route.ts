import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from "bcryptjs"

// GET /api/users - hanya bisa diakses oleh owner
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "owner") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await dbConnect()

    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 })

    return NextResponse.json(users)
  } catch (error: any) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 })
  }
}

// POST /api/users - membuat user baru (hanya owner yang bisa)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "owner") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, username, password, role } = await req.json()

    if (!name || !username || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 })
    }

    const newUser = new User({
      name,
      username,
      password,
      role,
    })

    await newUser.save()

    return NextResponse.json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}
