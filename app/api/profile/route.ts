import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import { authOptions } from "../auth/[...nextauth]/route"

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const body = await request.json()
        const { name, username, email, phone, profileImageUrl } = body

        // Check if username is already taken by another user
        if (username !== session.user.username) {
            const existingUser = await User.findOne({
                username,
                _id: { $ne: session.user.id },
            })

            if (existingUser) {
                return NextResponse.json({ error: "Username already taken" }, { status: 400 })
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            {
                name,
                username,
                email,
                phone,
                profileImageUrl,
            },
            { new: true, select: "-password" },
        )

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Convert MongoDB document to plain object
        const userObject = {
            id: updatedUser._id.toString(),
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email || "",
            phone: updatedUser.phone || "",
            profileImageUrl: updatedUser.profileImageUrl || "",
            role: updatedUser.role,
        }

        return NextResponse.json(userObject)
    } catch (error: any) {
        console.error("Error updating profile:", error)
        return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await dbConnect()

        const user = await User.findById(session.user.id).select("-password")

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Convert MongoDB document to plain object
        const userObject = {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            email: user.email || "",
            phone: user.phone || "",
            profileImageUrl: user.profileImageUrl || "",
            role: user.role,
        }

        return NextResponse.json(userObject)
    } catch (error: any) {
        console.error("Error fetching profile:", error)
        return NextResponse.json({ error: error.message || "Failed to fetch profile" }, { status: 500 })
    }
}
