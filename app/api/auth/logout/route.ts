import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log("Error signing out in logout api controller:", error)
            return NextResponse.json({ message: "Failed to log out" }, { status: 400 })
        }

        return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })

    } catch (error) {
        console.error("Unhandled error in logout api controller:", error)
        return NextResponse.json({ message: "Failed to log out" }, { status: 500 })
    }
}