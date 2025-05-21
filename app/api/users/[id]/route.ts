import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    await dbConnect()
    const { id } = await context.params

    const user = await User.findById(id)
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
}


export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    await dbConnect()

    const { id } = await context.params
    const deleted = await User.findByIdAndDelete(id)

    if (!deleted) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted" })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    await dbConnect()
    const { id } = await context.params
    const body = await req.json()

    const updated = await User.findByIdAndUpdate(id, body, { new: true })
    if (!updated) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
}
